"use client";

import { Product } from "@prisma/client";

import ButtonsHeader from "../../components/buttons-header";

interface ProductHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return <ButtonsHeader alt={product.name} imageUrl={product.imageUrl} imageStyle="object-contain" />;
};

export default ProductHeader;
