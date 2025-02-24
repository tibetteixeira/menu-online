import { OrderStatus, Prisma } from "@prisma/client";
import { ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { formatDate } from "@/app/helpers/date";
import { formatCurrency } from "@/app/helpers/format-currency";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        orderItems: {
          include: {
            product: true;
          };
        };
        restaurant: true;
      };
    }>
  >;
}

const OrderList = ({ orders }: OrderListProps) => {
  const getStatus = (status: OrderStatus) => {
    const statusList: Record<OrderStatus, { label: string; color: string }> = {
      PENDING: {
        label: "Pendente",
        color: "bg-gray-600",
      },
      IN_PREPARATION: {
        label: "Preparando",
        color: "bg-yellow-600",
      },
      DONE: {
        label: "Pronto",
        color: "bg-green-600",
      },
      CANCELED: {
        label: "Cancelado",
        color: "bg-red-600",
      },
    };
    return statusList[status];
  };

  return (
    <div className="space-y-6 p-6">
      <div className="mt-14 flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus pedidos</h2>
      </div>

      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full ${getStatus(order.status).color} px-2 py-1 text-xs font-semibold text-neutral-200`}
            >
              {getStatus(order.status).label}
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="relative h-5 w-5">
                  <Image
                    src={order.restaurant.avatarImageUrl}
                    alt={order.restaurant.name}
                    layout="fill"
                    className="rounded-sm"
                  />
                </div>
                <p className="text-sm font-semibold">{order.restaurant.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
            </div>

            <Separator />
            <div className="space-y-2">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold">
                    {item.quantity}
                  </div>
                  <p>{item.product.name}</p>
                </div>
              ))}
            </div>

            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
