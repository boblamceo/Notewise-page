"use client";
import React from "react";
import { useCookies } from "next-client-cookies";
const Main = () => {
    const cookies = useCookies();
    return <div>{cookies.get("email")}</div>;
};

export default Main;
