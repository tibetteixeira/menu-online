"use client";

import { Restaurant } from "@prisma/client";

import ButtonsHeader from "./buttons-header";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  return <ButtonsHeader alt={restaurant.name} imageUrl={restaurant.coverImageUrl} imageStyle="object-cover" />;
};

export default RestaurantHeader;
