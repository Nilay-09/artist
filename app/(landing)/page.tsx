
import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import Image from "next/image";

const LandingPage = () => {
    return (
        <div className="h-full ">
            <div className="w-full h-full relative bg-black/70 imageContainer">
                <Image
                    width={1200}
                    height={700}
                    src="/final.jpg"
                    alt="Background"
                    className="absolute w-screen h-full -z-10"
                />
                <LandingNavbar />
                <LandingHero />
            </div>
            <LandingContent />
        </div>
    );
}

export default LandingPage;