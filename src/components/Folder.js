import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Dialog,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import File from "./File";
import { motion } from "framer-motion";

const Folder = ({ folder, files, updateUserData, userData }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [isRenamingFolder, setIsRenamingFolder] = useState(false);
    const [deleteFolderSure, setDeleteFolder] = useState(false);
    const backgrounds = [
        "bg-red-200",
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-purple-200",
    ];
    const colors = [
        "text-red-200",
        "text-blue-200",
        "text-green-200",
        "text-yellow-200",
        "text-purple-200",
    ];
    const renameFolder = async (folderId) => {
        if (!userData || !newFolderName.trim()) return;

        const updatedFolders = userData.folders.map((folder) =>
            folder.id === folderId
                ? { ...folder, name: newFolderName.trim() }
                : folder
        );

        await updateUserData({ ...userData, folders: updatedFolders });
        setIsRenamingFolder(null);
    };

    const deleteFolder = async (folderId) => {
        const updatedFolders = userData.folders.filter(
            (folder) => folder.id !== folderId
        );
        await updateUserData({ ...userData, folders: updatedFolders });
    };

    const updateFolderColor = async (folderId, color) => {
        const updatedFolders = userData.folders.map((folder) =>
            folder.id === folderId ? { ...folder, color } : folder
        );

        await updateUserData({ ...userData, folders: updatedFolders });
        setShowColorPicker(null);
    };

    return (
        <>
            <Dialog
                open={!!deleteFolderSure}
                onClose={() => {
                    setDeleteFolder(false);
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
                                deleteFolder(folder.id);
                                setDeleteFolder(false);
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
                                setDeleteFolder(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
            <Accordion
                sx={{
                    backgroundColor: "rgba(0,0,0,0)",
                    color: "white",
                    fontSize: "1.5vw",
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setShowColorPicker(true);
                }}
                onClick={(e) => {
                    e.preventDefault();
                    setShowColorPicker(false);
                }}
            >
                <AccordionSummary
                    expandIcon={
                        <i className="fa-solid fa-angle-down text-white"></i>
                    }
                >
                    <i
                        className={`fa-solid fa-folder pt-1 mr-[5vw] ${
                            colors[folder.color]
                        }`}
                    ></i>
                    {isRenamingFolder === folder.id ? (
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onBlur={() => renameFolder(folder.id)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && renameFolder(folder.id)
                            }
                            className="px-2 py-1 rounded outline-none"
                            autoFocus
                        />
                    ) : (
                        folder.name
                    )}
                    {showColorPicker ? (
                        <motion.div
                            className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10"
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
                            <div className="flex space-x-2">
                                {backgrounds.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`w-6 h-6 rounded-full ${color}`}
                                        onClick={() =>
                                            updateFolderColor(folder.id, index)
                                        }
                                    />
                                ))}
                            </div>
                            <button
                                className="text-[1vw] text-gray-600 hover:text-gray-800 mt-[1vw]"
                                onClick={() => {
                                    setIsRenamingFolder(folder.id);
                                    setNewFolderName(folder.name);
                                    setShowColorPicker(null);
                                }}
                            >
                                Rename
                            </button>
                            <button
                                className="w-full text-[1vw] text-red-600 hover:bg-red-200 mt-[1vw] py-[0.5vw] rounded"
                                onClick={() => {
                                    setDeleteFolder(true);
                                }}
                            >
                                <i className={`fa-solid fa-trash mr-[1vw]`}></i>
                                Delete
                            </button>
                        </motion.div>
                    ) : null}
                </AccordionSummary>
                <AccordionDetails>
                    {files.toReversed().map((file, index) => {
                        return (
                            <File
                                file={file}
                                folder={folder.id}
                                key={index}
                                userData={userData}
                                updateUserData={updateUserData}
                            />
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Folder;
