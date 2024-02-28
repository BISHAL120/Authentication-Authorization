"use client";

import { CardWrapper } from "./CardWrapper";
import * as z from "zod";
import { LoginScheme } from "@/schemas";
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
import { login } from "@/action/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email Already use with Different Provider"
      : "";

  const [twofactor, setTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const from = useForm<z.infer<typeof LoginScheme>>({
    resolver: zodResolver(LoginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmit = (values: z.infer<typeof LoginScheme>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            from.reset();
            setError(data?.error);
          }
          if (data?.success) {
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't Have an Account"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...from}>
        <form onSubmit={from.handleSubmit(formSubmit)} className="space-y-6">
          <div className=" space-y-4">
            {twofactor && (
              <FormField
                control={from.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Two Factor Code
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!twofactor && (
              <>
                <FormField
                  control={from.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={from.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="px-0" variant="link" size="sm" asChild>
                  <Link href="/auth/reset">Forget Password?</Link>
                </Button>
              </>
            )}
          </div>
          <FromError message={error || urlError} />
          <FromSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {twofactor ? "Submit" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
