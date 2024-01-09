"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("8333bc7f-d818-46ea-81bb-84658e595a3e");
    }, []);

    return null;
};