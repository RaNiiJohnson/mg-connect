-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY['MEMBER']::TEXT[];

-- CreateTable
CREATE TABLE "service_provider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "description" TEXT,
    "experience" TEXT,
    "tarif" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_provider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_provider_userId_key" ON "service_provider"("userId");

-- AddForeignKey
ALTER TABLE "service_provider" ADD CONSTRAINT "service_provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
