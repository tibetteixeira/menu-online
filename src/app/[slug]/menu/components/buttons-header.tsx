"use client";

import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  alt?: string;
  imageUrl?: string;
  imageStyle?: string;
  onlyBackButton?: boolean;
}

const ButtonsHeader = ({
  alt,
  imageUrl,
  imageStyle,
  onlyBackButton,
}: RestaurantHeaderProps) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBack = () => router.back();
  const handleOrderSummary = () => router.push(`/${slug}/orders`);

  if (onlyBackButton) {
    return (
      <div className="relative w-full">
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-4 z-10 rounded-full"
          onClick={handleBack}
        >
          <ChevronLeftIcon />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[280px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-10 rounded-full"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>
      {imageUrl && alt && (
        <Image src={imageUrl} fill alt={alt} className={`${imageStyle}`} />
      )}
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-10 rounded-full"
        onClick={handleOrderSummary}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ButtonsHeader;
