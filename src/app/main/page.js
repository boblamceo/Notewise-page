"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { HomeIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import {
    updateDoc,
    doc,
    getDoc,
    getDocs,
    where,
    collection,
    query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Plus, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

const Main = () => {
    const [userData, setUserData] = useState(null);
    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showColorPicker, setShowColorPicker] = useState(null);
    const [isRenaming, setIsRenaming] = useState(null);
    const [newFileName, setNewFileName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cookies = useCookies();
    const userEmail = cookies.get("email");
    const colors = [
        "text-red-200",
        "text-blue-200",
        "text-green-200",
        "text-yellow-200",
        "text-purple-200",
    ];
    const backgrounds = [
        "bg-red-200",
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-purple-200",
    ];

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Query the users collection to find the document with matching email
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError("User not found");
                setLoading(false);
                return;
            }

            // Get the first (and should be only) matching document
            const userDoc = querySnapshot.docs[0];
            const userData = {
                id: userDoc.id,
                ...userDoc.data(),
            };

            setUserData(userData);
            setFiles(userData.files || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    };

    const updateUserFiles = async (newFiles) => {
        if (!userData) return;

        try {
            const userRef = doc(db, "users", userData.id);
            await updateDoc(userRef, {
                files: newFiles,
            });
            setFiles(newFiles);
        } catch (error) {
            console.error("Error updating files:", error);
            setError("Failed to update files");
        }
    };

    const createNewFile = async () => {
        if (!userData) return;

        const newFile = {
            id: crypto.randomUUID(),
            name: "New File",
            color: 0,
            createdAt: Date.now(),
        };

        const updatedFiles = [...files, newFile];
        await updateUserFiles(updatedFiles);
    };

    const updateFileColor = async (fileId, color) => {
        const updatedFiles = files.map((file) =>
            file.id === fileId ? { ...file, color } : file
        );

        await updateUserFiles(updatedFiles);
        setShowColorPicker(null);
    };

    const renameFile = async (fileId) => {
        if (newFileName.trim()) {
            const updatedFiles = files.map((file) =>
                file.id === fileId
                    ? { ...file, name: newFileName.trim() }
                    : file
            );

            await updateUserFiles(updatedFiles);
            setIsRenaming(null);
            setNewFileName("");
        }
    };

    const deleteFile = async (fileId) => {
        const updatedFiles = files.filter((file) => file.id !== fileId);
        await updateUserFiles(updatedFiles);
    };

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl w-[80vw] ml-auto mr-auto mt-[80vh]">
                {error}
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="bg-yellow-50 text-yellow-600 p-4 rounded-xl w-[80vw] ml-auto mr-auto mt-[80vh]">
                No user data available
            </div>
        );
    }
    return (
        <div className="flex h-screen bg-black">
            <div className="w-[20vw] bg-[#171820] shadow-lg p-[2vw]">
                <div className="flex mb-[3vw]">
                    <img
                        src="/images/Logo.png"
                        alt="Notewise"
                        className="object-contain h-[4.5vw]"
                    />
                </div>

                <nav className="space-y-[2vw]">
                    <motion.button
                        className="flex items-center space-x-3 w-full rounded-lg hover:drop-shadow-[0_0_0.5vw_#fff] transition-all"
                        whileTap={{
                            fontWeight: "bold",
                        }}
                        transition={{
                            type: "spring",
                            duration: 0.1,
                        }}
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                    </motion.button>

                    <motion.button className="flex items-center space-x-3 w-full rounded-lg hover:drop-shadow-[0_0_0.5vw_#fff] transition-all">
                        <MicrophoneIcon className="w-5 h-5" />
                        <span>Quick Record</span>
                    </motion.button>
                </nav>
            </div>
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[3vw] font-bold text-white mb-[2vw]"
                    >
                        Dashboard
                    </motion.h1>

                    <div className="grid grid-cols-2 gap-[5vw] mb-[2vw]">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-[1vw] border-blue-500 text-white rounded-xl shadow-lg hover:border-blue-600 border-2 transition-all"
                        >
                            <i className="fa-solid fa-microphone mr-[1.5vw]"></i>
                            Quick Record
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-[1vw] border-red-500 text-white rounded-xl shadow-lg hover:border-red-600 border-2 transition-all "
                        >
                            <i className="fa-brands fa-youtube mr-[1.5vw]"></i>
                            YouTube Video
                        </motion.button>
                    </div>

                    <div className="rounded-xl shadow-lg p-6">
                        <div className="flex items-center space-x-4 mb-6 justify-end">
                            <div className="box">
                                <form name="search">
                                    <input
                                        type="text"
                                        className="input"
                                        name="txt"
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    ></input>
                                </form>
                                <i className="fas fa-search"></i>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={createNewFile}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                <Plus />
                            </motion.button>
                        </div>

                        <div className="space-y-3">
                            {filteredFiles.map((file) => (
                                <motion.div
                                    key={file.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-[1vw] flex items-center justify-between cursor-pointer hover:shadow-[0_0_2vw_rgba(255,255,255,0.7)]`}
                                >
                                    <i
                                        className={`fa-regular fa-folder ${
                                            colors[file.color]
                                        }`}
                                    ></i>
                                    {isRenaming === file.id ? (
                                        <input
                                            type="text"
                                            value={newFileName}
                                            onChange={(e) =>
                                                setNewFileName(e.target.value)
                                            }
                                            onBlur={() => renameFile(file.id)}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                renameFile(file.id)
                                            }
                                            className="px-2 py-1 rounded"
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{file.name}</span>
                                    )}

                                    <div className="relative">
                                        <button
                                            onClick={() =>
                                                setShowColorPicker((curr) =>
                                                    curr === file.id
                                                        ? null
                                                        : file.id
                                                )
                                            }
                                            className="p-1 hover:bg-black/10 rounded"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>

                                        <motion.div
                                            className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10 space-y-[2vh]"
                                            animate={{
                                                opacity:
                                                    showColorPicker === file.id
                                                        ? 1
                                                        : 0,
                                            }}
                                        >
                                            <div className="flex space-x-2">
                                                {backgrounds.map(
                                                    (color, index) => (
                                                        <button
                                                            key={index}
                                                            className={`w-6 h-6 rounded-full ${color}`}
                                                            onClick={() =>
                                                                updateFileColor(
                                                                    file.id,
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <button
                                                className="text-sm text-gray-600 hover:text-gray-800"
                                                onClick={() => {
                                                    setIsRenaming(file.id);
                                                    setNewFileName(file.name);
                                                    setShowColorPicker(null);
                                                }}
                                            >
                                                Rename
                                            </button>
                                            <button
                                                className="w-full text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-[1vw] py-[0.5vw] rounded"
                                                onClick={() =>
                                                    deleteFile(file.id)
                                                }
                                            >
                                                <i
                                                    className={`fa-solid fa-trash text-red-600 hover:text-red-800 mr-[1vw]`}
                                                ></i>
                                                Delete
                                            </button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Main;
