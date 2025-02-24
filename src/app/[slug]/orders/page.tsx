import { getOrdersByUser } from "@/app/data/get-order";

import ButtonsHeader from "../menu/components/buttons-header";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
  params: Promise<{ slug: string }>;
}

const OrdersPage = async ({ params, searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;
  const { slug } = await params;
  const orders = await getOrdersByUser(cpf, slug);

  if (!cpf) {
    return <CpfForm />;
  }

  return (
    <div>
      <ButtonsHeader onlyBackButton={true} />
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
