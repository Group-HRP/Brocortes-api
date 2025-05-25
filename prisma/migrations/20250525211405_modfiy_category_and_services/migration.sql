/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_serviceId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "serviceId";

-- CreateTable
CREATE TABLE "_CategoryServices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryServices_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryServices_B_index" ON "_CategoryServices"("B");

-- AddForeignKey
ALTER TABLE "_CategoryServices" ADD CONSTRAINT "_CategoryServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryServices" ADD CONSTRAINT "_CategoryServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
