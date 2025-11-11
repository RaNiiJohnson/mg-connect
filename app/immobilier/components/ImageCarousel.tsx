"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  coverPhoto: string;
  title: string;
}

export function ImageCarousel({
  images,
  coverPhoto,
  title,
}: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [fullscreenApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // Combiner la photo de couverture avec les autres photos
  const allImages = [coverPhoto, ...images];

  useEffect(() => {
    if (!api) {
      return;
    }

    // Initialiser l'index courant
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap());

    // Écouter les changements de sélection
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    // Cleanup
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setIsFullscreen(true);
  };

  // Gérer le carousel plein écran
  useEffect(() => {
    if (!fullscreenApi) {
      return;
    }

    // Synchroniser avec l'index courant quand on ouvre le plein écran
    fullscreenApi.scrollTo(fullscreenIndex, false);

    // Écouter les changements de sélection
    const handleFullscreenSelect = () => {
      setFullscreenIndex(fullscreenApi.selectedScrollSnap());
    };

    fullscreenApi.on("select", handleFullscreenSelect);

    // Cleanup
    return () => {
      fullscreenApi.off("select", handleFullscreenSelect);
    };
  }, [fullscreenApi, fullscreenIndex]);

  // Navigation au clavier pour le mode plein écran
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        fullscreenApi?.scrollPrev();
      }
      if (e.key === "ArrowRight") {
        fullscreenApi?.scrollNext();
      }
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, fullscreenApi]);

  return (
    <>
      {/* Carrousel principal avec shadcn/ui */}
      <div className="relative group mb-6">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {allImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-80 w-full rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                  {/* Bouton plein écran */}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0"
                    onClick={() => openFullscreen(index)}
                  >
                    <Expand className="h-4 w-4" />
                  </Button>
                  {/* Compteur d'images */}
                  <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                    {index + 1} / {allImages.length}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation personnalisée */}
          <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0" />
          <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0" />
        </Carousel>

        {/* Indicateurs personnalisés */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === current
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        )}

        {/* Miniatures */}
        {allImages.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                  index === current
                    ? "border-primary scale-105"
                    : "border-transparent hover:border-muted-foreground/50"
                )}
                onClick={() => api?.scrollTo(index)}
              >
                <Image
                  src={image}
                  alt={`Miniature ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                {index === current && (
                  <div className="absolute inset-0 bg-primary/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal plein écran */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0">
          <DialogTitle className="sr-only">
            Galerie d&apos;images - {title}
          </DialogTitle>
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {/* Test: Image simple d'abord */}
            <div className="relative w-full h-full bg-red-500/20">
              <Image
                src={allImages[fullscreenIndex]}
                alt={`${title} - Image ${fullscreenIndex + 1}`}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </div>

            {/* Navigation simple pour test */}
            {fullscreenIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 bg-black/50"
                onClick={() => setFullscreenIndex(fullscreenIndex - 1)}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {fullscreenIndex < allImages.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10 bg-black/50"
                onClick={() => setFullscreenIndex(fullscreenIndex + 1)}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Compteur plein écran */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg z-10">
              {fullscreenIndex + 1} / {allImages.length}
            </div>

            {/* Indicateurs plein écran */}
            {allImages.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-200",
                      index === fullscreenIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    onClick={() => {
                      setFullscreenIndex(index);
                      fullscreenApi?.scrollTo(index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
