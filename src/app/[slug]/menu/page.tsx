import { notFound } from "next/navigation";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionType: string }>;
}

const isConsumptionTypeValid = (consumptionType: string) => {
  return ["IN_LOCAL", "TAKEAWAY"].includes(consumptionType.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionType } = await searchParams;

  if (!isConsumptionTypeValid(consumptionType)) {
    return notFound();
  }

  return (
    <h1>
      {slug} - {consumptionType}
    </h1>
  );
};

export default RestaurantMenuPage;
