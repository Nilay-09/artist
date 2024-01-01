import Image from "next/image";


interface EmptyProps {
    label: string;
}

export const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className="min-h-fit p-20 flex flex-col items-center justify-center">
            <div className="relative  w-32 h-32 md:h-40 md:w-40">
                <Image src="/emptyCon.png" fill alt="Empty" />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    );
};