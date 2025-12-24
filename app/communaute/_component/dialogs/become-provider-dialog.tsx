"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createServiceProvider,
  updateServiceProvider,
} from "@app/communaute/_actions/community.action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ServiceProviderListItem } from "@app/communaute/_actions/community.action";

const formSchema = z.object({
  serviceType: z
    .string()
    .min(3, "Le type de service doit faire au moins 3 caractères"),
  description: z.string().optional(),
  experience: z.string().optional(),
  tarif: z.string().optional(),
  available: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface BecomeProviderDialogProps {
  userId: string;
  trigger?: React.ReactNode;
  existingProfile?: ServiceProviderListItem | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BecomeProviderDialog({
  userId,
  trigger,
  existingProfile,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: BecomeProviderDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: existingProfile?.serviceType || "",
      description: existingProfile?.description || "",
      experience: existingProfile?.experience || "",
      tarif: existingProfile?.tarif || "",
      available: existingProfile?.available ?? true,
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        if (existingProfile) {
          await updateServiceProvider({
            userId,
            serviceType: values.serviceType,
            description: values.description,
            experience: values.experience,
            tarif: values.tarif,
            available: values.available,
          });
          toast.success("Profil prestataire mis à jour");
        } else {
          await createServiceProvider({
            userId,
            serviceType: values.serviceType,
            description: values.description,
            experience: values.experience,
            tarif: values.tarif,
          });
          toast.success("Félicitations ! Vous êtes maintenant prestataire");
        }
        if (setOpen) setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error("Une erreur est survenue");
        console.error(error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {existingProfile
              ? "Modifier mon profil prestataire"
              : "Devenir prestataire de service"}
          </DialogTitle>
          <DialogDescription>
            {existingProfile
              ? "Mettez à jour vos informations de service."
              : "Proposez vos services à la communauté MG Connect. Remplissez ce formulaire pour créer votre profil."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de service</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Traduction, Cours d'allemand, Déménagement..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Le service principal que vous proposez.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez vos services en détail..."
                      className="resize-none"
                      rows={3}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tarif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarif indicatif (optionnel)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 20€/heure"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expérience (optionnel)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 5 ans"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {existingProfile && (
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Disponible</FormLabel>
                      <FormDescription>
                        Affichez ce badge si vous acceptez de nouvelles
                        missions.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {existingProfile ? "Mettre à jour" : "Créer mon profil"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
