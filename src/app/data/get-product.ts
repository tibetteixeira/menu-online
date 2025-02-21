import { db } from "@/lib/prisma";

export const getProductById = async (id: string) => {
  return await db.product.findUnique({
    where: {
      id,
    },
  });
};

export const getProductWithRestaurantById = async (id: string) => {
  return await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true,
          name: true,
          slug: true,
        },
      },
    },
  });
};
