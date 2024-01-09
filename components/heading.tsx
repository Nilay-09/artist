import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Montserrat, Poppins } from "next/font/google";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

export const Heading = ({
  title,
  description,
  icon: LucideIcon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <LucideIcon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          <h2 className={cn("text-3xl font-bold text-black", poppins.className)}>{title}</h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};