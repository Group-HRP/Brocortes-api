-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "canceledById" INTEGER,
ADD COLUMN     "cancellationReason" TEXT;
