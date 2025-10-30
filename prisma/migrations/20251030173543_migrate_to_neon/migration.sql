-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "arrivalDate" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "field" TEXT,
ADD COLUMN     "journey" TEXT[],
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "public"."job_offer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contractType" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "certificates" TEXT[],
    "salary" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."real_estate_listing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "deposit" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "pets" BOOLEAN NOT NULL DEFAULT false,
    "photos" TEXT[],
    "description" TEXT NOT NULL,
    "extras" TEXT[],
    "contact" TEXT NOT NULL,
    "available" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "real_estate_listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."job_offer" ADD CONSTRAINT "job_offer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."real_estate_listing" ADD CONSTRAINT "real_estate_listing_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
