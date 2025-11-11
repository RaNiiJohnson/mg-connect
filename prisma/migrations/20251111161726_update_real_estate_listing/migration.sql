/*
  Warnings:

  - You are about to drop the column `contact` on the `real_estate_listing` table. All the data in the column will be lost.
  - The `available` column on the `real_estate_listing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `coverPhoto` to the `real_estate_listing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `floor` on the `real_estate_listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."real_estate_listing" DROP COLUMN "contact",
ADD COLUMN     "coverPhoto" TEXT NOT NULL,
DROP COLUMN "floor",
ADD COLUMN     "floor" INTEGER NOT NULL,
DROP COLUMN "available",
ADD COLUMN     "available" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."ContactInfo" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_listingId_key" ON "public"."ContactInfo"("listingId");

-- AddForeignKey
ALTER TABLE "public"."ContactInfo" ADD CONSTRAINT "ContactInfo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "public"."real_estate_listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
