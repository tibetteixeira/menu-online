import { db } from "@/lib/prisma";

export const getOrdersByUser = async (userCPF: string, slug: string) => {
  return await db.order.findMany({
    where: {
      customerCPF: userCPF,
      restaurant: {
        slug,
      },
    },
    include: {
      orderItems: true,
      restaurant: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
