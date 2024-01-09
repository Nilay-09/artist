"use client";
import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Download, ImageIcon, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";

import Image from "next/image";



const ImageGenerationPage = () => {

    const router = useRouter();
    const proModal = useProModal();
    const [photos, setPhotos] = useState<string[]>([]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setPhotos([]);

            const response = await axios.post('/api/image', values);

            const urls = response.data.map((image: { url: string }) => image.url);

            setPhotos(urls);
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

    // To Scroll down
    const scrollRef = useRef<ElementRef<"div">>(null);
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [photos.length]);


    return (
        <div className="flex flex-col overflow-x-hidden"
        >
            <Heading
                title="Salvador Dali"
                description="The king of Surrealism can turn your prompt into image"
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8  overflow-y-auto">
                {/* messages  */}
                <div className="space-y-4 mt-4 min-h-[50vh]">

                    {photos.length === 0 && !isLoading && (
                        <Empty label="No photos generated." />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {photos.map((src) => (
                            <Card key={src} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image
                                        fill
                                        alt="Generated"
                                        src={src}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
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
                        className="rounded-lg border p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col md:flex-row justify-between gap-2 bg-violet-500/10 mx-auto"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10  outline-none">
                                    <FormControl className="m-0 p-0 w-[27.5rem]">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="realistic portrait of an elderly sailor"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex w-[100%]">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="w-[45%]">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className=" focus:ring-pink-700">
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="w-[45%]">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className=" focus:ring-pink-700">
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className=" bg-pink-700 hover:bg-pink-700/90 w-[100%] md:w-[6.125rem]" type="submit" disabled={isLoading} size="icon">
                            <PaperPlaneIcon />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ImageGenerationPage