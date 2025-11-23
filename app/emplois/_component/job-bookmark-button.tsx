"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toggleJobBookmark } from "../actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [isBookmarked, setOptimisticIsBookmarked] = useOptimistic(
    initialIsBookmarked,
    (state, newState: boolean) => newState
  );
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      const newState = !isBookmarked;
      setOptimisticIsBookmarked(newState);
      try {
        await toggleJobBookmark(jobId);
        toast.success(
          newState ? "Offre enregistrée" : "Offre retirée des favoris"
        );
      } catch (error) {
        setOptimisticIsBookmarked(!newState);
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
        isBookmarked ? "text-primary" : "text-muted-foreground",
        className
      )}
      onClick={handleToggle}
      disabled={isPending}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5 fill-current" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
      <span className="sr-only">
        {isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
      </span>
    </Button>
  );
}
