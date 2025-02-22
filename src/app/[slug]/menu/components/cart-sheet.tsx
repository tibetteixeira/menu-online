import { formatCurrency } from "@/app/helpers/format-currency";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCart } from "../contexts/cart";
import { DrawerProvider } from "../contexts/drawer";
import CartProcutItemProps from "./cart-product-item";
import FinishOrderButton from "./finish-order-button";

const CartSheet = () => {
  const { isOpen, toggleCart, products, calculateTotalOrder } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProcutItemProps key={product.id} product={product} />
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(calculateTotalOrder())}
                </p>
              </div>
            </CardContent>
          </Card>
          <DrawerProvider>
            <FinishOrderButton />
          </DrawerProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
