import { motion } from "framer-motion";
import React from "react";

const Header = ({ aboutRef, startedRef, hide }) => {
    const item = {
        hidden: { opacity: 0, y: -100 },
        show: { opacity: 1, y: 0 },
    };
    return (
        <motion.div
            className="sticky top-0 z-10 text-white w-full p-[1vw] flex flex-row items-center pr-[3vw] pointer-events-none [&>*]:pointer-events-auto"
            transition={{ staggerChildren: 0.3, duration: 0.5 }}
            initial="hidden"
            animate="show"
        >
            <motion.img
                variants={item}
                src={"/images/Logo.png"}
                className="h-[4.5vw] logo"
            ></motion.img>
            <motion.a
                className="btn btn-2 font-bold"
                onClick={() => {
                    aboutRef.current.scrollIntoView();
                }}
                variants={item}
            >
                About
            </motion.a>
            <motion.a
                className="btn btn-2 font-bold"
                onClick={() => {
                    startedRef.current.scrollIntoView();
                }}
                variants={item}
            >
                Get Started
            </motion.a>
            <motion.a
                className="btn btn-5 ml-auto"
                variants={item}
                onClick={() => {
                    hide();
                }}
            >
                Sign Up
            </motion.a>
        </motion.div>
    );
};

export default Header;
