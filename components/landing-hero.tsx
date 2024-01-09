"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Londrina_Solid } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Londrina_Solid({ weight: '400', subsets: ['latin'] });

export const LandingHero = () => {
    const { isSignedIn } = useAuth();


    return (
        <div className={cn("bg-transparent text-white py-[4.5rem] font-bold flex items-center justify-center flex-col text-center space-y-5", font.className)}>

            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best AI Tool for</h1>
                <div className="leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fff475] to-[#ff7328]">
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Chatbot.",
                                "Photo Generation.",
                                "Blog Writing.",
                                "Code Debugging."
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Create content using AI 10x faster.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className=" md:text-lg p-4 md:p-6 rounded-full font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#fff475] to-[#ff7328] border-2 border-[#fff475]">
                        Start Generating For Free
                    </Button>
                </Link>
            </div>

            <div id="scroll-down-animation" className="opacity-60">
                <span className="mouse">
                    <span className="move"></span>
                </span>
                <h2>Scroll down</h2>
            </div>
        </div>
    );
};