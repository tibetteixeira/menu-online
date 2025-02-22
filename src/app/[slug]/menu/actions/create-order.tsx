"use server";

import { ConsumptionType } from "@prisma/client";
import { notFound } from "next/navigation";

import { getProducstById } from "@/app/data/get-product";
import { getRestaurantBySlug } from "@/app/data/get-restaurant";
import { removePontuation } from "@/app/helpers/cpf";
import { db } from "@/lib/prisma";

interface CreateOrderInput {
  customerName: string;
  customerCPF: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionType: ConsumptionType;
  restaurantSlug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await getRestaurantBySlug(input.restaurantSlug);

  if (!restaurant) {
    return notFound();
  }

  const products = await getProducstById(
    input.products.map((product) => product.id),
  );

  const productsWithPriceAndQuantity = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: products.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      customerName: input.customerName,
      customerCPF: removePontuation(input.customerCPF),
      consumptionType: input.consumptionType,
      restaurantId: restaurant.id,
      status: "PENDING",
      orderItems: {
        createMany: {
          data: productsWithPriceAndQuantity,
        },
      },
      total: productsWithPriceAndQuantity.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
    },
  });
};
