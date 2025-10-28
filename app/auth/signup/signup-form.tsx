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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const SignupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.email({
    message: "Adresse email invalide.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
});

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    setIsLoading(true);
    authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: async (ctx) => {
          // Si l'email verification est requise, l'utilisateur ne sera pas connecté automatiquement
          if (ctx.data.user && !ctx.data.user.emailVerified) {
            toast.success(
              "Compte créé ! Vérifiez votre email pour activer votre compte.",
              {
                duration: 6000,
              }
            );
            // Rediriger vers une page de vérification ou rester sur la page
            router.push("/auth/verify-email");
          } else {
            // Si pas de vérification requise, rediriger normalement
            router.push("/");
          }
        },
        onError: (error) => {
          toast.error(error.error.message);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Dupont"
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
                <FormLabel>Mot de passe</FormLabel>
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
                Création du compte...
              </>
            ) : (
              "Créer un compte"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
