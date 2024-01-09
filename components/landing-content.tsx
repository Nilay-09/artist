"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const imageSources = Array.from({ length: 27 }, (_, index) => `/div${index + 1}.jpg`);

export const LandingContent = () => {
    return (
        <div className="parent px-16 md:px-32 grid grid-cols-1 md:grid-cols-4 pb-20 mx-auto mt-[6.25rem]">
            {imageSources.map((source, index) => (
                <div key={index} className={`div${index + 1} overflow-hidden `}>
                    <Image
                        src={source}
                        alt=""
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-md hover:scale-95 transition-all ease-in-out filter hover:grayscale bg-transparent "
                    />
                </div>
            ))}
        </div>

    )
}