"use client";
import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Download, FileAudio, MessageSquare, Paintbrush } from "lucide-react"
import { useForm } from "react-hook-form"
import { formSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementRef, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Empty } from "@/components/empty";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";


const PicassoPage = () => {

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

            const response = await axios.post('/api/picasso', values);
            console.log(response)
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
                title="Pablo Picasso"
                description="world-renowned Spanish painter"
                icon={Paintbrush}
                iconColor="text-blue-700"
                bgColor="bg-blue-700/10"
            />
            <div className="px-4 lg:px-8 flex-1 overflow-y-auto">

                <div className="space-y-4 mt-4">
                    {!video && !isLoading && (
                        <Empty label="No files generated." />
                    )}
                    {video && (
                        <Card className="rounded-lg overflow-hidden">
                            <div className="relative flex justify-center items-center">
                                <Image
                                    alt="Generated"
                                    src={video}
                                    width={400}
                                    height={500}
                                />
                            </div>
                            <CardFooter className="p-2">
                                <Button onClick={() => window.open(video)} variant="secondary" className="w-full">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
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
                                <FormItem className="col-span-12 lg:col-span-11 w-full">
                                    <FormControl className="m-0 p-0 w-full">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 w-full focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="A fantasy landscape, Cinematic lighting"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className=" bg-blue-700 hover:bg-blue-700/90" type="submit" disabled={isLoading} size="icon">
                            <PaperPlaneIcon />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default PicassoPage