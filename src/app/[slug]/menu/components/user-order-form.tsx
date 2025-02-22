"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionType } from "@prisma/client";
import { useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { isValidCPF } from "@/app/helpers/cpf";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../actions/create-order";
import { useCart } from "../contexts/cart";
import { useDrawer } from "../contexts/drawer";

const formSchema = z.object({
  name: z.string().trim().min(3, {
    message: "O nome é obrigatório",
  }),
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

const UserOrderForm = () => {
  const { products } = useCart();
  const { closeDrawer } = useDrawer();

  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionType = searchParams.get(
        "consumptionType",
      ) as ConsumptionType;

      await createOrder({
        customerName: data.name,
        customerCPF: data.cpf,
        restaurantSlug: slug,
        products,
        consumptionType,
      });

      closeDrawer();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Informe seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
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
        <Button className="w-full rounded-full" type="submit">
          Finalizar
        </Button>
      </form>
    </Form>
  );
};

export default UserOrderForm;
