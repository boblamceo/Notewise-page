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
import { useRouter } from "next/navigation";
import { Button, Dialog } from "@mui/material";
import YoutubePopup from "@/components/YoutubePopup";

const Main = () => {
    return <div>hello world</div>;
};

export default Main;
