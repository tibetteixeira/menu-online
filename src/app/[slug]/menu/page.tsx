import { notFound } from "next/navigation";

import { getRestaurantWithCategoriesAndProductsBySlug } from "@/app/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

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

  const restaurant = await getRestaurantWithCategoriesAndProductsBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
