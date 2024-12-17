import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Dialog } from "@mui/material";

const File = ({ file, folder, userData, updateUserData }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const [deleteFileSure, setDeleteFile] = useState(false);
    const [isRenamingFile, setIsRenamingFile] = useState(null);
    const [newFileName, setNewFileName] = useState("");

    const renameFile = async (folderId, fileId) => {
        if (!userData || !newFileName.trim()) return;

        const updatedFolders = userData.folders.map((folder) => {
            if (folder.id === folderId) {
                const updatedFiles = folder.files.map((file) =>
                    file.id === fileId
                        ? { ...file, name: newFileName.trim() }
                        : file
                );
                return { ...folder, files: updatedFiles };
            }
            return folder;
        });

        await updateUserData({ ...userData, folders: updatedFolders });
        setIsRenamingFile(null);
        setNewFileName("");
    };

    const deleteFile = async (folderId, fileId) => {
        const updatedFolders = userData.folders.map((folder) => {
            if (folder.id === folderId) {
                const updatedFiles = folder.files.filter(
                    (file) => file.id !== fileId
                );
                return { ...folder, files: updatedFiles };
            }
            return folder;
        });

        await updateUserData({ ...userData, folders: updatedFolders });
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-[1vw] flex items-center justify-between cursor-pointer hover:shadow-[0_0_2vw_rgba(255,255,255,0.7)]`}
        >
            <Dialog
                open={!!deleteFileSure}
                onClose={() => {
                    setDeleteFile(false);
                }}
            >
                <div className="p-[2vw] space-y-[2vw] text-[1.5vw] bg-[#171820] text-white">
                    <div className="font-semibold">
                        Do you really want to delete this file?
                    </div>
                    <div className="flex flex-row space-x-[2vw]">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                deleteFile(folder, file.id);
                                setDeleteFile(false);
                            }}
                            sx={{
                                fontSize: window.innerWidth * 0.01,
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            sx={{
                                color: "#808080",
                                fontSize: window.innerWidth * 0.01,
                            }}
                            onClick={() => {
                                setDeleteFile(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
            <i className={`fa-regular fa-file text-white`}></i>
            <div className="w-full pl-[5vw]">
                {isRenamingFile === file.id ? (
                    <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onBlur={() => {
                            renameFile(folder, file.id);
                        }}
                        onKeyDown={(e) =>
                            e.key === "Enter" && renameFile(folder, file.id)
                        }
                        className="px-2 py-1 rounded outline-none"
                        autoFocus
                    />
                ) : (
                    <span className="text-[1.2vw]">{file.name}</span>
                )}
                <div className="text-[1vw] text-[#a7a7a7]">
                    {new Date(file.createdAt).toLocaleDateString("en-US")}
                </div>
            </div>
            <div className="relative">
                <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="p-1 hover:bg-black/10 rounded"
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
                {showColorPicker ? (
                    <motion.div
                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-[1vw] z-10"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: showColorPicker ? 1 : 0,
                        }}
                        transition={{
                            ease: "linear",
                        }}
                    >
                        <button
                            className="text-[1vw] hover:bg-gray-200 text-gray-600 hover:text-gray-800 flex flex-row px-[2vw] py-[0.5vw]"
                            onClick={() => {
                                setIsRenamingFile(file.id);
                                setShowColorPicker(false);
                            }}
                        >
                            <i className="fa-regular fa-pen-to-square mr-[1vw] mt-[2px]"></i>
                            Rename
                        </button>
                        <button
                            className="w-full text-[1vw] text-red-600 hover:bg-red-200 py-[0.5vw] rounded flex flex-row px-[2vw]"
                            onClick={() => {
                                setDeleteFile(true);
                            }}
                        >
                            <i
                                className={`fa-solid fa-trash mr-[1vw] mt-[2px]`}
                            ></i>
                            Delete
                        </button>
                    </motion.div>
                ) : null}
            </div>
        </motion.div>
    );
};

export default File;
