import { notFound } from "next/navigation";

import { getOrdersByUser } from "@/app/data/get-order";
import { formatDate } from "@/app/helpers/date";

interface UserOrderProps {
  params: Promise<{ userCPF: string; slug: string }>;
}

const UserOrder = async ({ params }: UserOrderProps) => {
  const { userCPF, slug } = await params;
  const orders = await getOrdersByUser(userCPF, slug);

  if (!orders) {
    return notFound();
  }

  return (
    <div>
      <h1>{orders[0].restaurant.name}</h1>
      <h2>{orders[0].customerName}</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <h2>{order.id}</h2>
          <p>{formatDate(order.createdAt)}</p>
          <p>{order.total}</p>
        </div>
      ))}
    </div>
  );
};

export default UserOrder;
