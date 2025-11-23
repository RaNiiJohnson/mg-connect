-- CreateTable
CREATE TABLE "job_bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_bookmark_userId_jobId_key" ON "job_bookmark"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "job_bookmark" ADD CONSTRAINT "job_bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_bookmark" ADD CONSTRAINT "job_bookmark_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job_offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
