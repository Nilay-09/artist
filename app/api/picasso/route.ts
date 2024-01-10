import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }
        
                const freeTrial = await checkApiLimit();
                const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        }

        const response = await replicate.run(
            "ai-forever/kandinsky-2-1:a768f3c2e174c54b576cc4f222e789e161160403d0cd0ace41eeb9a0f8c8d5f8",
            {
                input: {
                    prompt,
                }
            }
        );

        if (!isPro) {
            await incrementApiLimit();
        }

        return NextResponse.json(response);
    } catch (error) {
        console.log('[PICASSO_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};