import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";
import ConsumptionTypeOption from "./components/consumption-type-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center pt-20">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          width={82}
          height={82}
          alt={restaurant.name}
        />

        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 py-24 px-20 text-center">
        <h3 className="text-2xl font-semibold">Seja bem vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição.
          <br />
          Estamos aqui para oferecer praticidade e sabor em cada detalhe
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14 px-6">
        <ConsumptionTypeOption
          imageUrl="/dine_in.png"
          alt="Para comer aqui"
          buttonText="Para comer aqui"
          option="IN_LOCAL"
          slug={slug}
        />
        <ConsumptionTypeOption
          imageUrl="/takeaway.png"
          alt="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
