"use client"
import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import Image from "next/image";
import { useEffect, useState } from "react";

const LandingPage = () => {
    const [backgroundImage, setBackgroundImage] = useState("/final.jpg");

    useEffect(() => {
        const handleResize = () => {
            setBackgroundImage(window.innerWidth <= 600 ? "/sideImg.jpg" : "/final.jpg");
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="h-full ">
            <div className="w-full h-full relative bg-black/70 imageContainer">
                <Image
                    width={1200}
                    height={700}
                    src={backgroundImage}
                    alt="Background"
                    className="absolute w-screen h-full -z-10 object-cover"
                />
                <LandingNavbar />
                <LandingHero />
            </div>
            <LandingContent />
        </div>
    );
}

export default LandingPage;