"use client";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { HomeIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import {
    updateDoc,
    doc,
    getDocs,
    where,
    collection,
    query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Alert, Button, Dialog, DialogContent } from "@mui/material";
import YoutubePopup from "@/components/YoutubePopup";
import File from "@/components/File";
import Folder from "@/components/Folder";
import Select from "react-select";

import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const Main = () => {
    const [userData, setUserData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState(null);
    const [youtubePopupOpen, setYoutubePopupOpen] = useState(false);
    const [newFileHover, setNewFileHover] = useState(false);
    const [fileDialog, setFileDialog] = useState(false);
    const [folderOfFile, setFolderOfFile] = useState({
        label: "Folder",
        value: "Folder",
    });
    const router = useRouter();
    const cookies = useCookies();
    const userEmail = cookies.get("email");

    useEffect(() => {
        fetchUserData();
    }, [userEmail]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);

            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError("User not found");
                return;
            }

            const userDoc = querySnapshot.docs[0];
            const userData = {
                id: userDoc.id,
                ...userDoc.data(),
            };
            setUserData(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data");
        } finally {
            setLoading(false);
        }
    };

    const updateUserData = async (updatedData) => {
        if (!userData) return;

        try {
            const userRef = doc(db, "users", userData.id);
            await updateDoc(userRef, updatedData);
            setUserData(updatedData);
        } catch (error) {
            console.error("Error updating user data:", error);
            setError("Failed to update user data");
        }
    };

    const createNewFolder = async () => {
        if (!userData) return;

        const newFolder = {
            id: crypto.randomUUID(),
            name: "New Folder",
            color: 0,
            files: [],
        };

        const updatedFolders = [...(userData.folders || []), newFolder];
        await updateUserData({ ...userData, folders: updatedFolders });
    };

    const createNewFile = async (folderId) => {
        if (!userData) return;
        const newFile = {
            id: crypto.randomUUID(),
            name: "New File",
            createdAt: Date.now(),
        };
        const updatedFolders = userData.folders.map((folder) =>
            folder.id === folderId
                ? { ...folder, files: [...folder.files, newFile] }
                : folder
        );
        await updateUserData({ ...userData, folders: updatedFolders });
    };

    const filteredFiles =
        userData &&
        userData.folders
            .map((curr) =>
                curr.files.map((file) => {
                    return {
                        ...file,
                        folderId: curr.id,
                    };
                })
            )
            .flat()
            .filter((file) =>
                file.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

    useEffect(() => {
        if (!userEmail) {
            router.push("/");
        }
    }, []);

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
        <motion.div
            className="flex h-screen bg-black"
            initial={{
                opacity: 0,
            }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: warning ? 1 : 0 }}
                className="absolute bottom-[5vh] left-0 right-0 w-fit ms-auto me-auto z-[99999]"
            >
                <Alert
                    severity="warning"
                    onClose={() => {
                        setWarning(null);
                    }}
                >
                    {warning}
                </Alert>
            </motion.div>
            <Dialog
                open={fileDialog}
                onClose={() => {
                    setFileDialog(false);
                }}
                fullWidth
            >
                <DialogContent
                    className="w-full p-[3vw] space-y-[2vw] text-[1.5vw] bg-[#171820] text-white"
                    style={{ overflow: "hidden" }}
                >
                    <Select
                        defaultValue={"Choose a Folder..."}
                        isClearable
                        isSearchable
                        name="folder"
                        options={userData.folders.map((curr) => {
                            return { value: curr.id, label: curr.name };
                        })}
                        components={animatedComponents}
                        onChange={(event) => {
                            setFolderOfFile(event.value);
                        }}
                        styles={{
                            control: (styles) => {
                                return {
                                    ...styles,
                                    fontSize: "1.2vw",
                                    backgroundColor: "#2e3040",
                                };
                            },
                            singleValue: (styles) => {
                                return {
                                    ...styles,
                                    color: "white",
                                };
                            },
                            option: (styles, state) => {
                                return {
                                    ...styles,

                                    color: "#fff",
                                    backgroundColor: state.isSelected
                                        ? "#872b95"
                                        : "#2e3040",
                                    fontSize: "1vw",
                                    "&:active": {
                                        backgroundColor: "#373a4d",
                                    },
                                };
                            },
                            menuList: (styles) => {
                                return {
                                    ...styles,
                                    backgroundColor: "#2e3040",
                                    "::-webkit-scrollbar": {
                                        width: "0.5vw",
                                    },
                                    "::webkit-scrollbar-track": {
                                        backgroundColor: "transparent",
                                    },
                                    "::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#595f80",
                                        borderRadius: "100vw",
                                    },
                                    "::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "#474c66",
                                    },
                                };
                            },
                        }}
                        maxMenuHeight={window.innerWidth * 0.05}
                    />

                    <div className="flex flex-row space-x-[2vw]">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                createNewFile(folderOfFile);
                                setFileDialog(false);
                            }}
                            sx={{
                                fontSize: window.innerWidth * 0.01,
                            }}
                        >
                            New File
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <YoutubePopup
                open={youtubePopupOpen}
                change={setYoutubePopupOpen}
                className={`-z-10`}
                setWarning={setWarning}
            />

            <motion.div
                className="w-[20vw] bg-[#171820] shadow-lg p-[2vw]"
                initial={{
                    x: -200,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    opacity: {
                        duration: 1,
                    },
                }}
            >
                <div className="flex mb-[3vw]">
                    <img
                        src="/images/Logo.png"
                        alt="Notewise"
                        className="object-contain h-[4.5vw] cursor-pointer"
                    />
                </div>

                <nav className="space-y-[2vw]">
                    <motion.button
                        className="flex items-center space-x-3 w-full rounded-lg hover:drop-shadow-[0_0_0.5vw_#fff] transition-all cursor-pointer"
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

                    <motion.button className="flex items-center space-x-3 w-full rounded-lg hover:drop-shadow-[0_0_0.5vw_#fff] transition-all cursor-pointer">
                        <MicrophoneIcon className="w-5 h-5" />
                        <span>Quick Record</span>
                    </motion.button>
                    <motion.button
                        className="w-full text-sm text-red-600 hover:text-red-800 hover:bg-[rgba(255,0,0,0.05)] px-[1vw] py-[0.5vw] rounded"
                        onClick={() => {
                            cookies.remove("email");
                            cookies.remove("password");
                            router.push("/");
                        }}
                    >
                        <i
                            className={`fa-solid fa-right-from-bracket text-red-600 hover:text-red-800 mr-[1vw]`}
                        ></i>
                        Log Out
                    </motion.button>
                </nav>
            </motion.div>
            <main className="flex-1 overflow-y-hidden">
                <div className="p-[3vw] pt-[4vw]">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[3vw] font-bold text-white mb-[2vw]"
                    >
                        Dashboard
                    </motion.h1>

                    <div className="grid grid-cols-2 gap-[5vw] mb-[2vw] text-[1.6vw]">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-[1vw] border-blue-500 text-white rounded-xl shadow-lg hover:border-blue-600 border-2 transition-all"
                        >
                            <span className="mr-[1.5vw]">🎙️</span>
                            Quick Record
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setYoutubePopupOpen(true);
                            }}
                            className="p-[1vw] border-red-500 text-white rounded-xl shadow-lg hover:border-red-600 border-2 transition-all "
                        >
                            <i className="fa-brands fa-youtube mr-[1.5vw] text-red-700 bg-clip-text"></i>
                            YouTube Video
                        </motion.button>
                    </div>

                    <div className="rounded-xl shadow-lg p-6">
                        <div className="flex items-center space-x-4 mb-6 justify-end">
                            <motion.div
                                className="box"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
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
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative w-fit"
                                onClick={() => {
                                    setNewFileHover(!newFileHover);
                                }}
                            >
                                <motion.button className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:before:[box-shadow:_2vw_0vw_#a21caf] before:duration-500 hover:duration-500 hover:after:-right-[2vw] hover:before:right-[2vw] hover:before:-bottom-[2vw] hover:before:blur origin-left hover:decoration-2 hover:border-rose-300 relative bg-black w-[10vw] border text-left p-[1vw] text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-[2vw] before:h-[2vw] before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-[2vw] after:h-[2vw] after:content['']  after:bg-rose-300 after:right-[2vw] after:top-[0.75vw] after:rounded-full after:blur-lg duration-500">
                                    New&nbsp;&nbsp;
                                    <i
                                        className={`fa-solid fa-angle-right transition-all duration-100 ${
                                            newFileHover && "rotate-90"
                                        }`}
                                    ></i>
                                </motion.button>
                                {newFileHover ? (
                                    <motion.div
                                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg pt-[1vw] pb-[1vw] text-gray-600 text-[1.2vw] z-20"
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: newFileHover ? 1 : 0,
                                        }}
                                    >
                                        <div
                                            className="w-full flex flex-row text-black hover:bg-gray-200 cursor-pointer pl-[1vw] pt-[0.5vw] pb-[0.5vw] pr-[1vw] whitespace-nowrap"
                                            onClick={createNewFolder}
                                        >
                                            <i className="fa-regular fa-folder w-[2vw] pt-1"></i>
                                            New Folder
                                        </div>
                                        <div
                                            className="w-full flex flex-row text-black hover:bg-gray-200 cursor-pointer pl-[1vw] pt-[0.5vw] pb-[0.5vw] pr-[1vw] whitespace-nowrap"
                                            onClick={() => {
                                                if (userData.folders.length) {
                                                    setFileDialog(true);
                                                } else {
                                                    setWarning(
                                                        "Please create a folder first!"
                                                    );
                                                }
                                            }}
                                        >
                                            <i className="fa-regular fa-file w-[2vw]  pt-1"></i>
                                            New File
                                        </div>
                                    </motion.div>
                                ) : null}
                            </motion.div>
                        </div>

                        <div className="space-y-3 h-[35vh] p-[2vw] overflow-x-visible overflow-y-scroll scrollbar">
                            {searchTerm
                                ? filteredFiles
                                      .toReversed()
                                      .map((file, index) => {
                                          return (
                                              <File
                                                  file={file}
                                                  folder={file.folderId}
                                                  key={index}
                                                  userData={userData}
                                                  updateUserData={
                                                      updateUserData
                                                  }
                                              />
                                          );
                                      })
                                : userData.folders.map((folder, index) => (
                                      <Folder
                                          folder={folder}
                                          files={folder.files}
                                          key={index}
                                          userData={userData}
                                          updateUserData={updateUserData}
                                      />
                                  ))}
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
};

export default Main;
