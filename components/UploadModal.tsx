import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { modalState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
// @ts-ignore
import Modal from 'react-modal';
import { IoIosCamera } from 'react-icons/io';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const UploadModal = () => {

    const [loading, setLoading] = useState(false);

    const [storedUser, setStoredUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserString = localStorage.getItem('user');
        const parsedUser: User | null = storedUserString ? JSON.parse(storedUserString) : null;
        setStoredUser(parsedUser);
    }, []);

    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const filePicker = useRef<HTMLInputElement>(null);
    const captionRef = useRef<HTMLInputElement>(null);

    const addImageToPost = (event: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const files = event.target.files;

        if(files && files.length > 0) {
            reader.readAsDataURL(files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target?.result as string);
        }
    }

    const uploadPost = async () => {
        alert("yes");
        if(loading || !selectedFile) {
            return;
        }
        setLoading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            caption: captionRef.current?.value,
            username: storedUser?.username,
            profileImg: storedUser?.photoURL,
            createdAt: serverTimestamp()
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url").then(
            async(snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL
                });
            }
        );

        setLoading(false);
        setOpen(false);
        setSelectedFile(null);
    }

    return (
        <div>
            {
                open && (
                    <Modal className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md flex flex-col items-center' isOpen={open} onRequestClose={ () => setOpen(false) }>
                        <div className='flex flex-col justify-center items-center h-[100%]'>
                            {
                                selectedFile ? (
                                    <>
                                        <img onClick={() => setSelectedFile(null)} src={selectedFile} alt="Error Occured" className='w-full max-h-[250px] object-cover' />
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => filePicker.current?.click()} className='cursor-pointer text-5xl bg-red-200 p-2 rounded-full text-red-500'>
                                            <IoIosCamera />
                                        </button>
                                        <input type="file" accept='image/*' ref={filePicker} hidden onChange={addImageToPost} />
                                    </>
                                )
                            }

                            <input type="text" ref={captionRef} maxLength={150} placeholder='Enter a caption...' className='m-4 border-none text-center w-full focus:ring-0' />
                            <button disabled={!selectedFile} onClick={uploadPost} className='w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>
                                Upload Post
                            </button>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}

export default UploadModal;