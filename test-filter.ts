import "dotenv/config";
import { getAllRealEstateListings } from "./app/immobilier/_actions/immo.action";
import prisma from "@/lib/prisma";

async function main() {
  try {
    console.log("Testing minPrice=600...");
    const result1 = await getAllRealEstateListings({ minPrice: "600" });
    console.log(`Found ${result1.realEstateListings.length} listings.`);
    result1.realEstateListings.forEach((l) =>
      console.log(`- ${l.title}: ${l.price}`)
    );

    console.log("\nTesting maxPrice=600...");
    const result2 = await getAllRealEstateListings({ maxPrice: "600" });
    console.log(`Found ${result2.realEstateListings.length} listings.`);
    result2.realEstateListings.forEach((l) =>
      console.log(`- ${l.title}: ${l.price}`)
    );

    console.log("\nTesting range 500-1000...");
    const result3 = await getAllRealEstateListings({
      minPrice: "500",
      maxPrice: "1000",
    });
    console.log(`Found ${result3.realEstateListings.length} listings.`);
    result3.realEstateListings.forEach((l) =>
      console.log(`- ${l.title}: ${l.price}`)
    );
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
