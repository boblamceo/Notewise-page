"use client";
import {
    ArrowForward,
    Email,
    Info,
    Lock,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
    createTheme,
    IconButton,
    LinearProgress,
    ThemeProvider,
} from "@mui/material";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const theme = createTheme({
    status: {
        success: "#00B307",
    },
});

const Signup = () => {
    const [passwordVisible, setVisibility] = useState(false);
    const [iconLength, setIconLength] = useState(1);
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [goal, setGoal] = useState(null);
    const [infoHovered, setInfoHovered] = useState(0);
    const [signUpHovered, setSignHovered] = useState(0);
    const signUpButton = useRef(null);
    useEffect(() => {
        let counter = 3;
        if (passwordInput.length < 8) {
            counter -= 1;
            setGoal("Your password has to be 8 or more characters");
        }
        if (
            !/[^QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm\s]/g.test(
                passwordInput
            )
        ) {
            counter -= 1;
            setGoal("Add a number or a symbol");
        }
        if (!/[A-Z]/g.test(passwordInput)) {
            counter -= 1;
            setGoal("Add a capital letter");
        }
        setPasswordStrength(counter);
        if (counter === 3) {
            setGoal(null);
        }
    }, [passwordInput]);
    const changeLength = () => {
        setIconLength(0);
        setTimeout(() => {
            setVisibility(!passwordVisible);

            setIconLength(1);
        }, 250);
    };
    return (
        <ThemeProvider theme={theme}>
            <motion.div
                className="w-screen h-screen flex flex-row bg-[#171820]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                }}
            >
                <div className="bg-gradient-to-br from-violet-100 to-indigo-700 to-65% w-[50vw] h-screen p-[1vw]">
                    <img
                        src={"/images/Logo.png"}
                        className="h-[4.5vw] logo"
                    ></img>
                </div>
                <div className="w-[50vw] h-screen flex justify-center flex-col pl-[10vw] pr-[10vw]">
                    <div className="font-bold text-[3vw] mb-[1vh]">Welcome</div>
                    <div className="text-[1.5vw] mb-[7vh] text-gray-500">
                        Sign up to unlock Notewise!
                    </div>
                    <div className="bg-[#414459] w-[30vw] flex flex-row p-[1vw] rounded-full items-center hover:drop-shadow-[0_0_1vw_rgba(255,255,255,0.75)]">
                        <AccountCircleIcon className="text-[4vh]" />
                        <input
                            className="w-[20vw] ml-[2vw] bg-transparent outline-none text-[1.2vw]"
                            placeholder="Username"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                        ></input>
                    </div>
                    <div className="bg-[#414459] w-[30vw] flex flex-row p-[1vw] rounded-full items-center mt-[3vh] hover:drop-shadow-[0_0_1vw_rgba(255,255,255,0.75)]">
                        <Email className="text-[4vh]" />
                        <input
                            className="w-[20vw] ml-[2vw] bg-transparent outline-none text-[1.2vw]"
                            placeholder="Email Address"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        ></input>
                    </div>
                    <div className="bg-[#414459] h-[calc(4vh+2vw)] w-[30vw] flex flex-row pl-[1vw] pr-[1vw] rounded-full mt-[3vh] items-center hover:drop-shadow-[0_0_1vw_rgba(255,255,255,0.75)]">
                        <Lock className="text-[4vh]" />
                        <input
                            className="w-[20vw] ml-[2vw] bg-transparent outline-none text-[1.2vw]"
                            placeholder="Password"
                            type={passwordVisible ? "text" : "password"}
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        ></input>
                        <motion.div
                            animate={{
                                opacity: iconLength,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                        >
                            <IconButton onClick={changeLength}>
                                {passwordVisible ? (
                                    <Visibility
                                        className="text-[4vh] text-white"
                                        transition={{
                                            duration: 0.5,
                                        }}
                                    />
                                ) : (
                                    <VisibilityOff
                                        className="text-[4vh] text-white"
                                        transition={{
                                            duration: 0.5,
                                        }}
                                    />
                                )}
                            </IconButton>
                        </motion.div>
                    </div>
                    <div className="flex flex-row w-full justify-between mt-[4vh]">
                        <LinearProgress
                            variant="determinate"
                            value={passwordStrength >= 1 && 100}
                            sx={{
                                width: "32%",
                                borderRadius: "1000px",
                            }}
                            color={passwordStrength >= 1 ? "success" : "error"}
                        />
                        <LinearProgress
                            variant="determinate"
                            value={passwordStrength >= 2 && 100}
                            sx={{ width: "32%", borderRadius: "1000px" }}
                            color={passwordStrength >= 2 ? "success" : "error"}
                        />
                        <LinearProgress
                            variant="determinate"
                            value={passwordStrength === 3 && 100}
                            sx={{ width: "32%", borderRadius: "1000px" }}
                            color={passwordStrength >= 3 ? "success" : "error"}
                        />
                    </div>
                    <div className="text-[1.2vw] mt-[2vh] flex flex-row items-center relative w-fit">
                        Password Strength:
                        <span
                            className={`font-bold ${
                                passwordStrength === 1
                                    ? "text-[#ff9800]"
                                    : passwordStrength === 2
                                    ? "text-[#03a9f4]"
                                    : passwordStrength === 3
                                    ? "text-[#4caf50]"
                                    : "text-[#ea7e7d]"
                            }`}
                        >
                            &nbsp;
                            {!passwordStrength
                                ? "Weak"
                                : passwordStrength === 1
                                ? "Medium"
                                : passwordStrength === 2
                                ? "Decent"
                                : passwordStrength === 3
                                ? "Strong"
                                : "No Password"}
                            &nbsp;
                        </span>
                        <IconButton
                            onMouseEnter={() => {
                                setInfoHovered(1);
                            }}
                            onMouseLeave={() => {
                                setInfoHovered(0);
                            }}
                            className="w-[1.2vw] h-[1.2vw]"
                        >
                            <Info className="text-white text-[1.2vw]" />
                        </IconButton>
                        <motion.div
                            className="bg-[#414459] p-[0.8vw] rounded-lg text-[1vw] absolute right-[0.6vw] top-[1.5vw] pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: infoHovered }}
                        >
                            {goal}
                        </motion.div>
                    </div>
                    <div
                        className="mt-[2vw] flex flex-row items-center justify-between cursor-pointer"
                        onMouseEnter={() => {
                            setSignHovered(1);
                        }}
                        onMouseLeave={() => {
                            setSignHovered(0);
                        }}
                        onClick={() => {
                            console.log(
                                signUpButton.current.getBoundingClientRect()
                            );
                            confetti({
                                particleCount: 150,
                                spread: 60,
                                origin: {
                                    x:
                                        (signUpButton.current.getBoundingClientRect()
                                            .x +
                                            signUpButton.current.getBoundingClientRect()
                                                .width /
                                                2) /
                                        window.innerWidth,
                                    y:
                                        (signUpButton.current.getBoundingClientRect()
                                            .top +
                                            signUpButton.current.getBoundingClientRect()
                                                .height /
                                                2) /
                                        window.innerHeight,
                                },
                            });
                        }}
                        ref={signUpButton}
                    >
                        <div className="font-bold text-[1.5vw]">Sign Up</div>
                        <div
                            className={`bg-gradient-to-b to-indigo-500 from-indigo-800 to-75% p-[1vw] rounded-full relative ${
                                signUpHovered &&
                                "shadow-[0_0_1vw_rgba(255,_255,_255,_0.7)]"
                            }`}
                        >
                            <ArrowForward
                                className={`text-[2vw] text-transparent z-10 transition-all duration-200`}
                            />
                            <ArrowForward
                                className={`text-[2vw] text-indigo-950 absolute -z-0 left-[1vw] transition-all duration-200`}
                            />
                            <ArrowForward
                                className={`text-[2vw] text-white absolute z-10 left-[1vw]  transition-all duration-200`}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </ThemeProvider>
    );
};

export default Signup;
