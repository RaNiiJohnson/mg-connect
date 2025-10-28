"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const SignInFormSchema = z.object({
  email: z.email({
    message: "Adresse e-mail invalide.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
});

export function SigninForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    setIsLoading(true);
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            alert("Veuillez vérifier votre adresse e-mail");
          }
          toast.error(ctx.error.message);
        },
      }
    );
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="nom@exemple.com"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Mot de passe</FormLabel>
                  <Link
                    className="text-sm text-primary hover:underline"
                    href="/auth/forget-password"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
