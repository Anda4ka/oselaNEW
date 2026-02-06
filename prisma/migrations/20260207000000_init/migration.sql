-- CreateTable
CREATE TABLE "RegionalPrice" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "regionUk" TEXT NOT NULL,
    "regionEn" TEXT NOT NULL,
    "pricePerSqM" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegionalPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanSettings" (
    "id" SERIAL NOT NULL,
    "ratePeriod1" DOUBLE PRECISION NOT NULL,
    "ratePeriod2" DOUBLE PRECISION NOT NULL,
    "minLoanAmount" INTEGER NOT NULL DEFAULT 200000,
    "maxLoanAmount" INTEGER NOT NULL DEFAULT 5000000,
    "minTermMonths" INTEGER NOT NULL DEFAULT 12,
    "maxTermMonths" INTEGER NOT NULL DEFAULT 240,
    "downPaymentPercent" DOUBLE PRECISION NOT NULL DEFAULT 20,
    "downPaymentPercent26" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "maxAreaExcessPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "maxPriceExcessPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCategory" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nameUk" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "ratePeriod1" DOUBLE PRECISION NOT NULL,
    "ratePeriod2" DOUBLE PRECISION NOT NULL,
    "maxBuildingAge" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'admin',
    "password" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nameUk" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "baseArea" DOUBLE PRECISION NOT NULL,
    "maxArea" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegionalPrice_region_key" ON "RegionalPrice"("region");

-- CreateIndex
CREATE UNIQUE INDEX "UserCategory_code_key" ON "UserCategory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyType_code_key" ON "PropertyType"("code");
