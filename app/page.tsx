import Image from "next/image";

export default function Home() {
  return (
    <section className="relative h-[80vh] w-full">
      {/* Image d'arrière-plan */}
      {/* <Image
        src="https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1600&h=900&fit=crop"
        alt="Vue aérienne de Munich avec Marienplatz et Frauenkirche au coucher du soleil"
        fill
        className="object-cover brightness-55"
        priority
      /> */}

      {/* Contenu centré */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 gap-4">
        <h1 className="sm:text-7xl text-5xl font-bold mb-2 drop-shadow-lg text-primary">
          Halo Halo
        </h1>
        <p className="text-xl drop-shadow-md max-w-5xl">
          Nous sommes une communauté dédiée aux réseautages entre natif et
          diaspora Malagasy en Allemagne. Une plateforme d’échange et de partage
          pour favoriser l’entraide entre les jeunes expats de Madagascar.
          Inscrivez vous pour rejoindre
        </p>
      </div>
    </section>
  );
}
