"use client";
import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Music } from "lucide-react"
import { useForm } from "react-hook-form"
import { formSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementRef, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Empty } from "@/components/empty";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader } from "@/components/loader";
import { Label } from "@/components/ui/label";
import { useProModal } from "@/hooks/use-pro-modal";


const MusicPage = () => {

    const proModal = useProModal();

    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post('/api/music', values);
            console.log(response)
            console.log(values)

            setMusic(response.data);
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
    }, [music?.length]);


    return (
        <div className="flex flex-col min-h-[90vh]"
        >
            <Heading
                title="Music Generation"
                description="Turn your prompt into music."
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8 flex-1 overflow-y-auto">
                {/* messages  */}
                <div className="space-y-4 mt-4 min-h-[50vh]">

                    {!music && !isLoading && (
                        <Empty label="No music generated." />
                    )}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
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
                        className="rounded-lg border w-[100%] p-4 px-3 md:px-6 focus-within:shadow-sm flex justify-between gap-2 bg-emerald-500/10 mx-auto"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="flex">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Raag Bhairav"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="bg-emerald-500 hover:bg-emerald-500/90" type="submit" disabled={isLoading} size="icon">
                            <PaperPlaneIcon />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default MusicPage