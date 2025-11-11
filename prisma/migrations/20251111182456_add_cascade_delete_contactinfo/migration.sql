-- DropForeignKey
ALTER TABLE "public"."ContactInfo" DROP CONSTRAINT "ContactInfo_listingId_fkey";

-- AddForeignKey
ALTER TABLE "ContactInfo" ADD CONSTRAINT "ContactInfo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "real_estate_listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
