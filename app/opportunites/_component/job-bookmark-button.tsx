"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { client } from "@/lib/orpc/orpc";

interface JobBookmarkButtonProps {
  jobId: string;
  initialIsBookmarked?: boolean;
  className?: string;
}

export function JobBookmarkButton({
  jobId,
  initialIsBookmarked = false,
  className,
}: JobBookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [optimisticIsBookmarked, setOptimisticIsBookmarked] = useOptimistic(
    isBookmarked, // État réel, pas initialIsBookmarked
    (_, newState: boolean) => newState
  );
  const [, startTransition] = useTransition();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = !isBookmarked;

    startTransition(async () => {
      setOptimisticIsBookmarked(newState); // Mise à jour optimiste

      try {
        await client.jobOffer.toggleJobBookmark({ jobId });
        setIsBookmarked(newState); // Mise à jour de l'état réel
        toast.success(
          newState ? "Offre enregistrée" : "Offre retirée des favoris"
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // L'état optimiste reviendra automatiquement à isBookmarked
        toast.error("Une erreur est survenue");
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 hover:bg-transparent p-0",
        optimisticIsBookmarked ? "text-primary" : "text-muted-foreground",
        className
      )}
      onClick={handleToggle}
    >
      {optimisticIsBookmarked ? (
        <BookmarkCheck className="h-5 w-5 fill-current" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
      <span className="sr-only">
        {optimisticIsBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
      </span>
    </Button>
  );
}
