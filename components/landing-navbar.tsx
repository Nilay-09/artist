"use client";

import { Montserrat, Londrina_Solid } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Londrina_Solid({ weight: '400', subsets: ['latin'] });

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="py-8 px-4 md:px-[7.5rem] bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <h1 className={cn("text-2xl font-normal text-white", font.className)}>
                    Artist.io
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="outline" className="rounded-full">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}