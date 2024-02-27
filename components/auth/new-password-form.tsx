"use client";

import { CardWrapper } from "./CardWrapper";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FromError } from "../from-error";
import { FromSuccess } from "../from-success";
import { startTransition, useState, useTransition } from "react";
import { NewPassword } from "@/action/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordFrom = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const from = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const formSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      NewPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...from}>
        <form onSubmit={from.handleSubmit(formSubmit)} className="space-y-6">
          <div className=" space-y-4">
            <FormField
              control={from.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FromError message={error} />
          <FromSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Confirm Your Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
