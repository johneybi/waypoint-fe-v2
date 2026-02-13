"use client";

import Image from "next/image";
import { Ellipsis } from "lucide-react";
import HeaderBtn from "@/components/layout/HeaderBtn";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  onMenuClick?: () => void;
  className?: string;
}

const CollectionCard = ({
  title,
  description,
  imageSrc,
  onMenuClick,
  className,
}: CollectionCardProps) => {
  return (
    <div
      className={cn(
        "w-[335px] overflow-hidden rounded-3xl border border-[#E2E2E2] bg-[#FAFAFA]",
        "shadow-[0px_10px_15px_-3px_#0000001A,0px_4px_6px_-4px_#0000001A]",
        className,
      )}
    >
      {/* Image Area */}
      <div className="relative h-[152px] w-full bg-white">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Text Area */}
      <div className="flex items-center justify-between pt-2.5 pr-4 pb-4 pl-5">
        <div className="flex flex-col gap-1">
          <span className="typography-display-lg-bold text-foreground">
            {title}
          </span>
          {description && (
            <span className="typography-body-sm-reg text-muted-foreground">
              {description}
            </span>
          )}
        </div>
        {/* Menu Button */}
        <HeaderBtn
          bgVariant="glass"
          icon={Ellipsis}
          label="메뉴"
          onClick={onMenuClick}
        />
      </div>
    </div>
  );
};

export default CollectionCard;
export type { CollectionCardProps };
