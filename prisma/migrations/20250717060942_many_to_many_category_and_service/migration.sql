/*
  Warnings:

  - You are about to drop the `_CategoryToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_B_fkey";

-- DropTable
DROP TABLE "_CategoryToService";

-- CreateTable
CREATE TABLE "_ServiceToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ServiceToCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ServiceToCategory_B_index" ON "_ServiceToCategory"("B");

-- AddForeignKey
ALTER TABLE "_ServiceToCategory" ADD CONSTRAINT "_ServiceToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToCategory" ADD CONSTRAINT "_ServiceToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
