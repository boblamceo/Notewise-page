"use client";
import {
    ArrowForward,
    Email,
    Info,
    Lock,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Alert,
    createTheme,
    IconButton,
    LinearProgress,
    SvgIcon,
    ThemeProvider,
} from "@mui/material";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

const theme = createTheme({
    status: {
        success: "#00B307",
    },
});

const Signup = () => {
    const [passwordVisible, setVisibility] = useState(false);
    const [iconLength, setIconLength] = useState(1);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [goal, setGoal] = useState(null);
    const [infoHovered, setInfoHovered] = useState(0);
    const [signUpHovered, setSignHovered] = useState(0);
    const [signUpWrong, setSignUpWrong] = useState(null);
    const [blobVisible, setBlobVisible] = useState(false);
    const signUpButton = useRef(null);
    const cookies = useCookies();
    const router = useRouter();

    const addToFirebase = async (collect, stuff, filter, callback) => {
        const querySnapshot = await getDocs(collection(db, collect));
        const final = [];
        querySnapshot.forEach((doc) => {
            final.push(doc.data());
        });
        let filtered = final.filter(filter);
        if (filtered.length) {
            setSignUpWrong("This account already exists");
        } else {
            await addDoc(collection(db, collect), stuff);
            callback();
        }
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                cookies.set("email", user.email);
                addToFirebase(
                    "users",
                    {
                        email: user.email,
                        password: "",
                        folders: [],
                    },
                    (item) => item.email === user.email,

                    () => {
                        setBlobVisible(true);
                        setTimeout(() => {
                            router.push("/main");
                        }, 1000);
                    }
                );
            })
            .catch((error) => {
                console.log("Google Login Error:", error);
            });
    };
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
                className="w-screen min-h-screen overflow-y-hidden flex flex-row bg-[#171820] text-white "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                }}
            >
                <div className="bg-gradient-to-br from-violet-100 to-indigo-700 to-65% w-[50vw] h-screen p-[1vw]">
                    <img
                        src={"/images/Logo.png"}
                        className="h-[4.5vw] logo cursor-pointer"
                        onClick={() => {
                            router.push("/");
                        }}
                    ></img>
                </div>
                <div className="w-[50vw] h-screen flex justify-center flex-col pl-[10vw] pr-[10vw] scale-95">
                    <div className="font-bold text-[3vw] mb-[1vh]">Welcome</div>
                    <div className="text-[1.5vw] mb-[3vh] text-gray-500">
                        Sign up to unlock Notewise!
                    </div>

                    <div
                        className={`w-[30vw] flex flex-row p-[1vw] rounded-full items-center mt-[3vh] hover:drop-shadow-[0_0_1vw_rgba(255,255,255,0.75)] ${
                            signUpWrong === "Provide a valid email address"
                                ? "animate-shake bg-[#CC0000] text-white"
                                : "bg-[#414459]"
                        }`}
                    >
                        <Email className="text-[4vh]" />
                        <input
                            className="w-[20vw] ml-[2vw] bg-transparent outline-none text-[1.2vw]"
                            placeholder="Email Address"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        ></input>
                    </div>
                    <div
                        className={`h-[calc(4vh+2vw)] w-[30vw] flex flex-row pl-[1vw] pr-[1vw] rounded-full mt-[3vh] items-center hover:drop-shadow-[0_0_1vw_rgba(255,255,255,0.75)] ${
                            signUpWrong === "Provide a password"
                                ? "animate-shake bg-[#CC0000] text-white"
                                : "bg-[#414459]"
                        }`}
                    >
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
                            className="bg-[#414459] p-[0.8vw] rounded-lg text-[1vw] absolute right-[0.6vw] top-[1.5vw] pointer-events-none z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: infoHovered }}
                        >
                            {goal}
                        </motion.div>
                    </div>
                    <motion.div
                        className="rounded-xl border-white border-2 w-full p-[1vw] flex flex-row font-bold text-[1vw] justify-center items-center mt-[2vh] cursor-pointer"
                        initial={{
                            scale: 1,
                        }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        transition={{
                            duration: 0.1,
                        }}
                        onClick={() => {
                            handleGoogleLogin();
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
                    >
                        <SvgIcon className="text-[1.5vw] mr-[1vw]">
                            <svg
                                width="800px"
                                height="800px"
                                viewBox="-3 0 262 262"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid"
                            >
                                <path
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                    fill="#34A853"
                                />
                                <path
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                    fill="#EB4335"
                                />
                            </svg>
                        </SvgIcon>
                        Sign Up With Google
                    </motion.div>
                    <div
                        className="mt-[2vh] flex flex-row items-center justify-between cursor-pointer"
                        onMouseEnter={() => {
                            setSignHovered(1);
                        }}
                        onMouseLeave={() => {
                            setSignHovered(0);
                        }}
                        onClick={() => {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            let problem = null;
                            console.log(
                                !emailPattern.test(emailInput) || !emailInput
                            );
                            if (!emailPattern.test(emailInput) || !emailInput) {
                                problem = "Provide a valid email address";
                            }
                            if (!passwordInput) {
                                problem = "Provide a password";
                            }
                            setSignUpWrong(problem);
                            if (!problem) {
                                cookies.set("email", emailInput);
                                cookies.set("password", passwordInput);
                                addToFirebase(
                                    "users",
                                    {
                                        email: emailInput,
                                        password: passwordInput,
                                        folders: [],
                                    },
                                    (item) => item.email === emailInput,

                                    () => {
                                        setBlobVisible(true);
                                        setTimeout(() => {
                                            router.push("/main");
                                        }, 1000);
                                    }
                                );
                            }
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
                    <div className="text-white text-[1vw] mt-[1vh] ml-auto mr-auto">
                        Already have an account?{" "}
                        <span
                            className="text-cyan-400 cursor-pointer"
                            onClick={() => {
                                setBlobVisible(true);
                                setTimeout(() => {
                                    router.push("/login");
                                }, 1000);
                            }}
                        >
                            Log In
                            <motion.img
                                className="absolute z-40 h-[10px] top-0 bottom-0"
                                src={"/images/blob.svg"}
                                animate={{
                                    scale: blobVisible ? window.innerHeight : 0,
                                }}
                                transition={{ duration: 1 }}
                            ></motion.img>
                        </span>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: signUpWrong ? 1 : 0 }}
                    className="absolute bottom-[5vh] left-0 right-0 w-fit ms-auto me-auto"
                >
                    <Alert
                        severity="error"
                        onClose={() => {
                            setSignUpWrong(null);
                        }}
                    >
                        {signUpWrong}
                    </Alert>
                </motion.div>
            </motion.div>
        </ThemeProvider>
    );
};

export default Signup;
