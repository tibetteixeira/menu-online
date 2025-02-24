"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { isValidCPF, removePontuation } from "@/app/helpers/cpf";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CpfFormProps {
  error?: string;
}

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório",
    })
    .refine((value) => isValidCPF(value), {
      message: "CPF inválido",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const CpfForm = ({ error }: CpfFormProps) => {
  const { slug } = useParams<{ slug: string }>();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
  });

  const [showToast, setShowToast] = useState(false);

  const handleConfirmCpf = () => {
    setShowToast(true); // Ativa o toast
  };

  useEffect(() => {
    if (showToast && error) {
      toast.error(error);
      setShowToast(false);
    }
  }, [showToast, error]);

  const router = useRouter();
  const pathName = usePathname();

  const onSubmit = (data: FormSchema) => {
    handleConfirmCpf();
    router.push(`${pathName}?cpf=${removePontuation(data.cpf)}`);
  };

  const handleCancel = () => {
    router.replace(`/${slug}`);
  };

  return (
    <div>
      <Drawer open>
        <DrawerTrigger className="hidden">Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Visualizar pedidos</DrawerTitle>
            <DrawerDescription>
              Insira seu CPF abaixo para visualizar seus pedidos
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="px-4">
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Informe seu CPF"
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button className="w-full rounded-full">Confirmar</Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="w-full rounded-full"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CpfForm;
