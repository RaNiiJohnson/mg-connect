-- AlterTable
ALTER TABLE "real_estate_listing" ADD COLUMN     "priceNumeric" INTEGER;

-- CreateTable
CREATE TABLE "real_estate_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "real_estate_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "real_estate_bookmark_userId_listingId_key" ON "real_estate_bookmark"("userId", "listingId");

-- AddForeignKey
ALTER TABLE "real_estate_bookmark" ADD CONSTRAINT "real_estate_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "real_estate_bookmark" ADD CONSTRAINT "real_estate_bookmark_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "real_estate_listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
