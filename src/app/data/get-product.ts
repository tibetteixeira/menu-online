import { db } from "@/lib/prisma";

export const getProductById = async (id: string) => {
  return await db.product.findUnique({
    where: {
      id,
    },
  });
};