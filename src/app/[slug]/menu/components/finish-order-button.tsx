import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useDrawer } from "../contexts/drawer";
import UserOrderForm from "./user-order-form";

const FinishOrderButton = () => {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <Drawer open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <DrawerTrigger asChild>
        <Button onClick={openDrawer} className="w-full rounded-full">
          Finalizar pedido
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <UserOrderForm />
          <DrawerClose asChild>
            <Button variant="outline" className="w-full rounded-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderButton;
