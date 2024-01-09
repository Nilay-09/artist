"use client";
import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FileAudio, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { formSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementRef, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Empty } from "@/components/empty";
import { BotAvatar } from "@/components/botAvatar";
import { UserAvatar } from "@/components/user-avatar";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";


const videoPage = () => {

    const router = useRouter();
    const proModal = useProModal();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post('/api/video', values);

            setVideo(response.data[0]);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong.", {
                    position: "top-right"
                })
            }
        } finally {
            router.refresh();
        }
    }

    const scrollRef = useRef<ElementRef<"div">>(null);
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [video?.length]);


    return (
        <div className="flex flex-col min-h-[90vh]"
        >
            <Heading
                title="Video Generation"
                description="Turn your prompt into video."
                icon={FileAudio}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8 flex-1 overflow-y-auto">
                {/* messages  */}
                <div className="space-y-4 mt-4">

                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No video files generated." />
                    )}
                    {video && (
                        <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
                            <source src={video} />
                        </video>
                    )}
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full h-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                </div>
                <div ref={scrollRef} />
            </div>
            <div className="mt-3 px-4 md:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-[100%] p-4 px-3 md:px-6 focus-within:shadow-sm flex justify-between gap-2 bg-violet-500/10 mx-auto"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Explain the function of leaves in a plant's life."
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className=" bg-orange-700 hover:bg-orange-700/90" type="submit" disabled={isLoading} size="icon">
                            <PaperPlaneIcon />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default videoPage