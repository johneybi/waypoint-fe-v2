"use client";

import Image from "next/image";
import { Ellipsis, MapPin, SquareX, Heart } from "lucide-react";
import HeaderBtn from "@/components/layout/HeaderBtn";
import { cn } from "@/lib/utils";

interface PlaceCardProps {
  title: string;
  address?: string;
  imageSrc?: string;
  rejectCount?: number;
  likeCount?: number;
  onMenuClick?: () => void;
  className?: string;
}

const PlaceCard = ({
  title,
  address,
  imageSrc,
  rejectCount = 0,
  likeCount = 0,
  onMenuClick,
  className,
}: PlaceCardProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[335px] overflow-hidden rounded-3xl border border-[#E2E2E2] bg-white",
        "shadow-[0px_10px_15px_-3px_#0000001A,0px_4px_6px_-4px_#0000001A]",
        className,
      )}
    >
      {/* Text Area */}
      <div className="pt-3.5 pr-5 pb-3 pl-5">
        <div className="flex flex-col gap-1">
          <span className="typography-title-lg-sb text-foreground">
            {title}
          </span>
          {address && (
            <span className="flex items-center gap-1 typography-body-sm-md text-neutral-600">
              <MapPin className="size-[18px] shrink-0" />
              {address}
            </span>
          )}
        </div>
      </div>

      {/* Image Area */}
      <div className="relative aspect-335/152 w-full bg-white">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        )}
        {/* Overlay Bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-2.5 pl-3.5">
          <div className="flex gap-2">

                        {/* Like Badge */}
                        <div className="flex items-center gap-1.5 rounded-full bg-[#FCFCFC99] px-4 py-2 backdrop-blur">
              <Heart className="size-5 text-foreground" />
              <span className="typography-body-sm-reg text-foreground">
                {likeCount}
              </span>
            </div>
            {/* Reject Badge */}
            <div className="flex items-center gap-1.5 rounded-full bg-[#FCFCFC99] px-4 py-2 backdrop-blur">
              <SquareX className="size-5 text-foreground" />
              <span className="typography-body-sm-reg text-foreground">
                {rejectCount}
              </span>
            </div>

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
    </div>
  );
};

export default PlaceCard;
export type { PlaceCardProps };
