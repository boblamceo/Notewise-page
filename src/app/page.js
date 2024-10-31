"use client";
import Header from "../components/Header";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const aboutRef = useRef(null);
    const startedRef = useRef(null);
    const [opacity, setOpacity] = useState(1);
    const router = useRouter();

    return (
        <motion.div
            className="flex flex-col -z-20 overflow-x-clip w-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 1 }}
        >
            <Header
                aboutRef={aboutRef}
                startedRef={startedRef}
                hide={() => {
                    setOpacity(0);
                    setTimeout(() => {
                        router.push("/signup");
                    }, 1000);
                }}
            />
            <div className="min-h-screen flex flex-col justify-end relative">
                <div className="flex flex-row items-center justify-between pl-[10vw] pr-[10vw] pb-[2vw]">
                    <div className="text-[7vw] font-bold z-20 mt-[10vh]">
                        <span className="drop-shadow-[0_0_1vw_rgba(255,255,255,0.8)] animate-pulse duration-[5]">
                            AI.
                        </span>{" "}
                        <br />
                        Education. <br />
                        Efficiently. <br />
                        Effectively.
                    </div>
                    <motion.img
                        src={"/images/book.gif"}
                        className="w-[35vw] z-20 "
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "linear",
                        }}
                    ></motion.img>
                </div>
                <span className="absolute text-[7vw] font-bold z-20 top-[10vh] left-[10vw]">
                    AI.
                </span>
                <span className="absolute text-[7vw] font-bold top-[calc(10vh+5px)] left-[calc(10vw+5px)] text-[#1e1e1e]">
                    AI.
                </span>
                <motion.img
                    src={"/images/Planet.svg"}
                    className="w-screen absolute bottom-0"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        opacity: {
                            duration: 2,
                        },
                    }}
                ></motion.img>
            </div>
            <div
                className="min-h-screen flex flex-col items-center"
                ref={aboutRef}
            >
                <motion.div
                    className="text-[4vw] font-bold z-20 mt-[20vh]"
                    initial={{ scale: 2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        opacity: { duration: 1 },
                        scale: { duration: 0.5 },
                    }}
                >
                    The{" "}
                    <motion.span
                        initial={{
                            filter: "none",
                        }}
                        whileInView={{
                            filter: "drop-shadow(0 0 1vw rgba(255,255,255,0.75)",
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                        }}
                    >
                        wise
                    </motion.span>{" "}
                    way of learning
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="w-max h-max macbook">
                        <img
                            src={"/images/Macbook.png"}
                            className="w-[90vw]"
                        ></img>
                    </div>
                </motion.div>
            </div>
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-20% from-black to-indigo-700 pb-[5vh]">
                <motion.div
                    className="text-[4vw] font-bold z-20 mt-[20vh]"
                    initial={{ scale: 2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ opacity: { duration: 1 } }}
                >
                    Simple Yet Powerful To Use
                </motion.div>
                <div className="w-[80vw]">
                    <div className="flex flex-row justify-evenly mt-[4vh] text-center">
                        <motion.div
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ opacity: { duration: 1 } }}
                            className="bg-white/10 w-[30vw] h-[18vw] rounded-3xl border-[2px] flex justify-center items-center flex-col p-2vw"
                        >
                            <div className="bg-white p-[1vw] rounded-[1vw]">
                                <KeyboardVoiceOutlinedIcon className="text-[#272956] text-[3vw]" />
                            </div>
                            <div className="text-[2.1vw] font-bold mt-[2vh] leading-none">
                                Record Lectures
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ opacity: { duration: 1 } }}
                            className="bg-white/10 w-[30vw] h-[18vw] rounded-3xl border-[2px] flex justify-center items-center flex-col p-[2vw]"
                        >
                            <div className="bg-white p-[1vw] rounded-[1vw]">
                                <YouTubeIcon className="text-[#272956] text-[3vw]" />
                            </div>
                            <div className="text-[2.1vw] font-bold mt-[2vh] leading-tight">
                                Summarize Youtube Videos
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex flex-row justify-evenly mt-[4vh]">
                        <motion.div
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ opacity: { duration: 1 } }}
                            className="bg-white/10 w-[30vw] h-[18vw] rounded-3xl border-[2px] flex justify-center items-center flex-col"
                        >
                            <div className="bg-white p-[1vw] rounded-[1vw]">
                                <FolderOpenOutlinedIcon className="text-[#272956] text-[3vw]" />
                            </div>
                            <div className="text-[2.1vw] font-bold mt-[2vh] leading-tight">
                                Organize Folders
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ opacity: { duration: 1 } }}
                            className="bg-white/10 w-[30vw] h-[18vw] rounded-3xl border-[2px] flex justify-center items-center flex-col"
                        >
                            <div className="bg-white p-[1vw] rounded-[1vw]">
                                <MoreHorizOutlinedIcon className="text-[#272956] text-[3vw]" />
                            </div>
                            <div className="text-[2.1vw] font-bold mt-[2vh] leading-tight">
                                More In The Future!
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div
                className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-20% from-indigo-700 to-black"
                ref={startedRef}
            >
                <motion.img
                    src="/images/shape1.png"
                    className="w-[15vw] absolute left-0 top-[15vh]"
                    animate={{
                        scale: [1, 1.1],
                        y: [0, Math.floor(Math.random() * 100) - 50, 0],
                        x: [0, Math.floor(Math.random() * 100) - 50, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                    }}
                ></motion.img>
                <motion.img
                    src="/images/shape2.png"
                    className="w-[15vw] absolute right-0 top-[60vh]"
                    animate={{
                        scale: [1, 1.1],
                        y: [0, Math.floor(Math.random() * 100) - 50, 0],
                        x: [0, Math.floor(Math.random() * 100) - 50, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                    }}
                ></motion.img>
                <motion.img
                    src="/images/shape3.png"
                    className="w-[15vw] absolute top-[0vh]"
                    animate={{
                        scale: [1, 1.1],
                        y: [0, Math.floor(Math.random() * 100) - 50, 0],
                        x: [0, Math.floor(Math.random() * 100) - 50, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                    }}
                ></motion.img>
                <div className="text-[3.5vw] font-bold">
                    What Are You Waiting For?
                </div>
                <div className="buttons">
                    <button
                        className="blob-btn"
                        onClick={() => {
                            setOpacity(0);
                            setTimeout(() => {
                                router.push("/signup");
                            }, 1000);
                        }}
                    >
                        Get Started
                        <span className="blob-btn__inner">
                            <span className="blob-btn__blobs">
                                <span className="blob-btn__blob"></span>
                                <span className="blob-btn__blob"></span>
                                <span className="blob-btn__blob"></span>
                                <span className="blob-btn__blob"></span>
                            </span>
                        </span>
                    </button>
                    <br />

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur
                                    in="SourceGraphic"
                                    result="blur"
                                    stdDeviation="10"
                                ></feGaussianBlur>
                                <feColorMatrix
                                    in="blur"
                                    mode="matrix"
                                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                    result="goo"
                                ></feColorMatrix>
                                <feBlend
                                    in2="goo"
                                    in="SourceGraphic"
                                    result="mix"
                                ></feBlend>
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
            <div className="w-screen bg-black p-[10vh] flex flex-row justify-center items-center relative">
                <div className="text-[0.5vw] text-gray-600 absolute left-[3vw]">
                    Image Credit: <br />
                    Dragon Icons
                    <br />
                    Png Tree
                </div>
                <img src="/images/Logo.png" className="w-[20vw]"></img>
                <div></div>
            </div>
        </motion.div>
    );
}
