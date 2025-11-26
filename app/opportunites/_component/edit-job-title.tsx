"use client";

import { Pencil, Check, X } from "lucide-react";
import {
  useState,
  useOptimistic,
  useTransition,
  useRef,
  useEffect,
} from "react";
import { updateJobTitle } from "@app/opportunites/_actions/job-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EditJobTitleProps {
  jobId: string;
  initialTitle: string;
  className?: string;
}

export function EditJobTitle({
  jobId,
  initialTitle,
  className,
}: EditJobTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [optimisticTitle, setOptimisticTitle] = useOptimistic(
    initialTitle,
    (_, newTitle: string) => newTitle
  );
  const [, startTransition] = useTransition();
  const [editValue, setEditValue] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedValue = editValue.trim();

    if (!trimmedValue) {
      toast.error("Le titre ne peut pas être vide");
      return;
    }

    if (trimmedValue === initialTitle) {
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      // 1️⃣ Update UI immediately
      setOptimisticTitle(trimmedValue);
      setIsEditing(false);

      // 2️⃣ Call server action
      try {
        await updateJobTitle(jobId, trimmedValue);
        toast.success("Titre mis à jour");
      } catch {
        // Revert on error
        setOptimisticTitle(initialTitle);
        setEditValue(initialTitle);
        toast.error("Erreur lors de la mise à jour");
      }
    });
  };

  const handleCancel = () => {
    setEditValue(initialTitle);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-3xl sm:text-4xl md:text-5xl font-bold h-auto py-2"
        />
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSave}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <Check className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCancel}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        {optimisticTitle}
      </h1>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
      >
        <Pencil className="w-5 h-5 text-primary" />
      </Button>
    </div>
  );
}
