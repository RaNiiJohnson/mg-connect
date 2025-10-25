import Image from "next/image";

export default function Home() {
  return (
    <section className="relative h-[70vh] w-full">
      {/* Image d'arrière-plan */}
      <Image
        src="https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1600&h=900&fit=crop"
        alt="Vue aérienne de Munich avec Marienplatz et Frauenkirche au coucher du soleil"
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Contenu centré */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-7xl font-bold mb-2 drop-shadow-lg">MG-Connect</h1>
        <p className="text-xl drop-shadow-md">
          A whole new world, the same one planet
        </p>
      </div>
    </section>
  );
}
