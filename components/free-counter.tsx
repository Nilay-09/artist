import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";

export const FreeCounter = ({
    isPro = false,
    apiLimitCount = 0,
}: {
    isPro: boolean,
    apiLimitCount: number
}) => {
    const [mounted, setMounted] = useState(false);
    const proModal = useProModal();


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const { user } = useUser();
    const { signOut } = useClerk();
    if (isPro) {
        return (
            <div className="px-3">
                <div className="w-full bg-white/10 border-0 flex justify-end items-center py-5 px-3 rounded-lg gap-2">
                    <UserButton afterSignOutUrl="/" />
                    <div className="">
                        <SignOutButton signOutCallback={() => signOut()}>Sign Out</SignOutButton>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            onClick={proModal.onOpen}
                            variant="premium" className="w-full">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}