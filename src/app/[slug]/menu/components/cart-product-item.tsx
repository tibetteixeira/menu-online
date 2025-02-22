import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";

import { CartProduct, useCart } from "../contexts/cart";

interface CartProcutItemProps {
  product: CartProduct;
}

const CartProcutItem = ({ product }: CartProcutItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useCart();
  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-neutral-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
              className="h-7 w-7 rounded-lg"
            >
              <ChevronLeftIcon size={12} />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              variant="destructive"
              onClick={() => increaseProductQuantity(product.id)}
              className="h-7 w-7 rounded-lg"
            >
              <ChevronRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="outline"
          className="h-7 w-7 rounded-lg"
          onClick={() => removeProductFromCart(product.id)}
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default CartProcutItem;
