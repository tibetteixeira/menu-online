import Image from "next/image";
import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.quantity}</p>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={32}
              height={32}
            />
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
