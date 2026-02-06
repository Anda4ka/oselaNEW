import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if data already exists
  const existingCategories = await prisma.userCategory.count();
  if (existingCategories > 0) {
    console.log('Database already seeded, skipping...');
    return;
  }

  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

  const regionalPrices = [
    { region: 'Kyiv', regionUk: '\u041A\u0438\u0457\u0432', regionEn: 'Kyiv', pricePerSqM: 27863 },
    { region: 'Vinnytsia', regionUk: '\u0412\u0456\u043D\u043D\u0438\u0446\u044C\u043A\u0430', regionEn: 'Vinnytsia', pricePerSqM: 22989 },
    { region: 'Volyn', regionUk: '\u0412\u043E\u043B\u0438\u043D\u0441\u044C\u043A\u0430', regionEn: 'Volyn', pricePerSqM: 22917 },
    { region: 'Dnipropetrovsk', regionUk: '\u0414\u043D\u0456\u043F\u0440\u043E\u043F\u0435\u0442\u0440\u043E\u0432\u0441\u044C\u043A\u0430', regionEn: 'Dnipropetrovsk', pricePerSqM: 23114 },
    { region: 'Donetsk', regionUk: '\u0414\u043E\u043D\u0435\u0446\u044C\u043A\u0430', regionEn: 'Donetsk', pricePerSqM: 25042 },
    { region: 'Zhytomyr', regionUk: '\u0416\u0438\u0442\u043E\u043C\u0438\u0440\u0441\u044C\u043A\u0430', regionEn: 'Zhytomyr', pricePerSqM: 20957 },
    { region: 'Zakarpattia', regionUk: '\u0417\u0430\u043A\u0430\u0440\u043F\u0430\u0442\u0441\u044C\u043A\u0430', regionEn: 'Zakarpattia', pricePerSqM: 20696 },
    { region: 'Zaporizhzhia', regionUk: '\u0417\u0430\u043F\u043E\u0440\u0456\u0437\u044C\u043A\u0430', regionEn: 'Zaporizhzhia', pricePerSqM: 23090 },
    { region: 'IvanoFrankivsk', regionUk: '\u0406\u0432\u0430\u043D\u043E-\u0424\u0440\u0430\u043D\u043A\u0456\u0432\u0441\u044C\u043A\u0430', regionEn: 'Ivano-Frankivsk', pricePerSqM: 21438 },
    { region: 'KyivRegion', regionUk: '\u041A\u0438\u0457\u0432\u0441\u044C\u043A\u0430', regionEn: 'Kyiv', pricePerSqM: 23811 },
    { region: 'Kirovohrad', regionUk: '\u041A\u0456\u0440\u043E\u0432\u043E\u0433\u0440\u0430\u0434\u0441\u044C\u043A\u0430', regionEn: 'Kirovohrad', pricePerSqM: 20262 },
    { region: 'Luhansk', regionUk: '\u041B\u0443\u0433\u0430\u043D\u0441\u044C\u043A\u0430', regionEn: 'Luhansk', pricePerSqM: 22870 },
    { region: 'Lviv', regionUk: '\u041B\u044C\u0432\u0456\u0432\u0441\u044C\u043A\u0430', regionEn: 'Lviv', pricePerSqM: 23711 },
    { region: 'Mykolaiv', regionUk: '\u041C\u0438\u043A\u043E\u043B\u0430\u0457\u0432\u0441\u044C\u043A\u0430', regionEn: 'Mykolaiv', pricePerSqM: 23805 },
    { region: 'Odesa', regionUk: '\u041E\u0434\u0435\u0441\u044C\u043A\u0430', regionEn: 'Odesa', pricePerSqM: 22840 },
    { region: 'Poltava', regionUk: '\u041F\u043E\u043B\u0442\u0430\u0432\u0441\u044C\u043A\u0430', regionEn: 'Poltava', pricePerSqM: 21198 },
    { region: 'Rivne', regionUk: '\u0420\u0456\u0432\u043D\u0435\u043D\u0441\u044C\u043A\u0430', regionEn: 'Rivne', pricePerSqM: 23416 },
    { region: 'Sumy', regionUk: '\u0421\u0443\u043C\u0441\u044C\u043A\u0430', regionEn: 'Sumy', pricePerSqM: 22366 },
    { region: 'Ternopil', regionUk: '\u0422\u0435\u0440\u043D\u043E\u043F\u0456\u043B\u044C\u0441\u044C\u043A\u0430', regionEn: 'Ternopil', pricePerSqM: 22347 },
    { region: 'Kharkiv', regionUk: '\u0425\u0430\u0440\u043A\u0456\u0432\u0441\u044C\u043A\u0430', regionEn: 'Kharkiv', pricePerSqM: 25058 },
    { region: 'Kherson', regionUk: '\u0425\u0435\u0440\u0441\u043E\u043D\u0441\u044C\u043A\u0430', regionEn: 'Kherson', pricePerSqM: 21691 },
    { region: 'Khmelnytskyi', regionUk: '\u0425\u043C\u0435\u043B\u044C\u043D\u0438\u0446\u044C\u043A\u0430', regionEn: 'Khmelnytskyi', pricePerSqM: 22944 },
    { region: 'Cherkasy', regionUk: '\u0427\u0435\u0440\u043A\u0430\u0441\u044C\u043A\u0430', regionEn: 'Cherkasy', pricePerSqM: 23482 },
    { region: 'Chernivtsi', regionUk: '\u0427\u0435\u0440\u043D\u0456\u0432\u0435\u0446\u044C\u043A\u0430', regionEn: 'Chernivtsi', pricePerSqM: 22068 },
    { region: 'Chernihiv', regionUk: '\u0427\u0435\u0440\u043D\u0456\u0433\u0456\u0432\u0441\u044C\u043A\u0430', regionEn: 'Chernihiv', pricePerSqM: 23870 },
  ];

  const userCategories = [
    { code: 'military', nameUk: '\u0412\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u043E\u0441\u043B\u0443\u0436\u0431\u043E\u0432\u0435\u0446\u044C \u0437\u0430 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u043E\u043C', nameRu: '\u0412\u043E\u0435\u043D\u043D\u043E\u0441\u043B\u0443\u0436\u0430\u0449\u0438\u0439 \u043F\u043E \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0443', nameEn: 'Contract Military', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'security', nameUk: '\u041F\u0440\u0430\u0446\u0456\u0432\u043D\u0438\u043A \u0441\u0435\u043A\u0442\u043E\u0440\u0443 \u0431\u0435\u0437\u043F\u0435\u043A\u0438', nameRu: '\u0420\u0430\u0431\u043E\u0442\u043D\u0438\u043A \u0441\u0435\u043A\u0442\u043E\u0440\u0430 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438', nameEn: 'Security Sector Employee', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'medic', nameUk: '\u041C\u0435\u0434\u0438\u0447\u043D\u0438\u0439 \u043F\u0440\u0430\u0446\u0456\u0432\u043D\u0438\u043A (\u0434\u0435\u0440\u0436\u0430\u0432\u043D\u0438\u0439/\u043A\u043E\u043C\u0443\u043D\u0430\u043B\u044C\u043D\u0438\u0439)', nameRu: '\u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0438\u0439 \u0440\u0430\u0431\u043E\u0442\u043D\u0438\u043A (\u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439/\u043A\u043E\u043C\u043C\u0443\u043D\u0430\u043B\u044C\u043D\u044B\u0439)', nameEn: 'Healthcare Worker (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'teacher', nameUk: '\u041F\u0435\u0434\u0430\u0433\u043E\u0433 (\u0434\u0435\u0440\u0436\u0430\u0432\u043D\u0438\u0439/\u043A\u043E\u043C\u0443\u043D\u0430\u043B\u044C\u043D\u0438\u0439)', nameRu: '\u041F\u0435\u0434\u0430\u0433\u043E\u0433 (\u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439/\u043A\u043E\u043C\u043C\u0443\u043D\u0430\u043B\u044C\u043D\u044B\u0439)', nameEn: 'Teacher (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'scientist', nameUk: '\u041D\u0430\u0443\u043A\u043E\u0432\u0435\u0446\u044C (\u0434\u0435\u0440\u0436\u0430\u0432\u043D\u0438\u0439/\u043A\u043E\u043C\u0443\u043D\u0430\u043B\u044C\u043D\u0438\u0439)', nameRu: '\u0423\u0447\u0435\u043D\u044B\u0439 (\u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439/\u043A\u043E\u043C\u043C\u0443\u043D\u0430\u043B\u044C\u043D\u044B\u0439)', nameEn: 'Scientist (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'idp', nameUk: '\u0412\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u044C\u043E \u043F\u0435\u0440\u0435\u043C\u0456\u0449\u0435\u043D\u0430 \u043E\u0441\u043E\u0431\u0430 (\u0412\u041F\u041E)', nameRu: '\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u043D\u043E\u0435 \u043B\u0438\u0446\u043E (\u0412\u041F\u041E)', nameEn: 'Internally Displaced Person (IDP)', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 10 },
    { code: 'veteran', nameUk: '\u0412\u0435\u0442\u0435\u0440\u0430\u043D \u0432\u0456\u0439\u043D\u0438', nameRu: '\u0412\u0435\u0442\u0435\u0440\u0430\u043D \u0432\u043E\u0439\u043D\u044B', nameEn: 'War Veteran', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3 },
    { code: 'regular', nameUk: '\u0413\u0440\u043E\u043C\u0430\u0434\u044F\u043D\u0438\u043D \u0431\u0435\u0437 \u0432\u043B\u0430\u0441\u043D\u043E\u0433\u043E \u0436\u0438\u0442\u043B\u0430', nameRu: '\u0413\u0440\u0430\u0436\u0434\u0430\u043D\u0438\u043D \u0431\u0435\u0437 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0436\u0438\u043B\u044C\u044F', nameEn: 'Citizen without housing', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3 },
  ];

  const propertyTypes = [
    { code: 'apartment', nameUk: '\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430', nameRu: '\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430', nameEn: 'Apartment', baseArea: 52.5, maxArea: 115.5 },
    { code: 'house', nameUk: '\u0416\u0438\u0442\u043B\u043E\u0432\u0438\u0439 \u0431\u0443\u0434\u0438\u043D\u043E\u043A', nameRu: '\u0416\u0438\u043B\u043E\u0439 \u0434\u043E\u043C', nameEn: 'House', baseArea: 62.5, maxArea: 125.5 },
  ];

  const loanSettings = {
    ratePeriod1: 0.07,
    ratePeriod2: 0.10,
    minLoanAmount: 200000,
    maxLoanAmount: 5000000,
    minTermMonths: 12,
    maxTermMonths: 240,
    downPaymentPercent: 20,
    downPaymentPercent26: 10,
    maxAreaExcessPercent: 10,
    maxPriceExcessPercent: 10,
  };

  await prisma.regionalPrice.deleteMany();
  await prisma.userCategory.deleteMany();
  await prisma.propertyType.deleteMany();
  await prisma.loanSettings.deleteMany();
  await prisma.adminUser.deleteMany();

  await prisma.regionalPrice.createMany({ data: regionalPrices });
  await prisma.userCategory.createMany({ data: userCategories });
  await prisma.propertyType.createMany({ data: propertyTypes });
  await prisma.loanSettings.create({ data: loanSettings });
  await prisma.adminUser.create({ data: { username: 'admin', password: adminPassword } });

  console.log('Seed completed successfully!');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
