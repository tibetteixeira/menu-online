"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useCart } from "../contexts/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [activeCategory, setActiveCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

  const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
    return activeCategory.id === category.id ? "default" : "secondary";
  };

  const { calculateTotalOrder, toggleCart, calculateTotalQuantityOrder } =
    useCart();
  const totalQuantity = calculateTotalQuantityOrder();

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            width={45}
            height={45}
            alt={restaurant.name}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">Fast Food</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <div>Aberto</div>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h3 className="px-5 pt-2 font-semibold">{activeCategory.name}</h3>
      <Products products={activeCategory.products} />
      {totalQuantity > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border border-t bg-white px-3 py-5">
          <div>
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrency(calculateTotalOrder())}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>
          <Button onClick={toggleCart} variant="default">
            Ver sacola
          </Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
