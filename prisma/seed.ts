import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Хешування пароля адміна
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)

  // 1. Регіональні ціни (Наказ Мінрозвитку №1155 від 16.07.2025, станом на 01.07.2025)
  const regionalPrices = [
    { region: 'Kyiv', regionUk: 'Київ', regionEn: 'Kyiv', pricePerSqM: 29665 },
    { region: 'Vinnytsia', regionUk: 'Вінницька', regionEn: 'Vinnytsia', pricePerSqM: 24475 },
    { region: 'Volyn', regionUk: 'Волинська', regionEn: 'Volyn', pricePerSqM: 24399 },
    { region: 'Dnipropetrovsk', regionUk: 'Дніпропетровська', regionEn: 'Dnipropetrovsk', pricePerSqM: 24608 },
    { region: 'Donetsk', regionUk: 'Донецька', regionEn: 'Donetsk', pricePerSqM: 26661 },
    { region: 'Zhytomyr', regionUk: 'Житомирська', regionEn: 'Zhytomyr', pricePerSqM: 22312 },
    { region: 'Zakarpattia', regionUk: 'Закарпатська', regionEn: 'Zakarpattia', pricePerSqM: 22034 },
    { region: 'Zaporizhzhia', regionUk: 'Запорізька', regionEn: 'Zaporizhzhia', pricePerSqM: 24583 },
    { region: 'IvanoFrankivsk', regionUk: 'Івано-Франківська', regionEn: 'Ivano-Frankivsk', pricePerSqM: 22824 },
    { region: 'KyivRegion', regionUk: 'Київська', regionEn: 'Kyiv Region', pricePerSqM: 25351 },
    { region: 'Kirovohrad', regionUk: 'Кіровоградська', regionEn: 'Kirovohrad', pricePerSqM: 21572 },
    { region: 'Luhansk', regionUk: 'Луганська', regionEn: 'Luhansk', pricePerSqM: 24348 },
    { region: 'Lviv', regionUk: 'Львівська', regionEn: 'Lviv', pricePerSqM: 25244 },
    { region: 'Mykolaiv', regionUk: 'Миколаївська', regionEn: 'Mykolaiv', pricePerSqM: 25344 },
    { region: 'Odesa', regionUk: 'Одеська', regionEn: 'Odesa', pricePerSqM: 24316 },
    { region: 'Poltava', regionUk: 'Полтавська', regionEn: 'Poltava', pricePerSqM: 22569 },
    { region: 'Rivne', regionUk: 'Рівненська', regionEn: 'Rivne', pricePerSqM: 24930 },
    { region: 'Sumy', regionUk: 'Сумська', regionEn: 'Sumy', pricePerSqM: 23812 },
    { region: 'Ternopil', regionUk: 'Тернопільська', regionEn: 'Ternopil', pricePerSqM: 23791 },
    { region: 'Kharkiv', regionUk: 'Харківська', regionEn: 'Kharkiv', pricePerSqM: 26678 },
    { region: 'Kherson', regionUk: 'Херсонська', regionEn: 'Kherson', pricePerSqM: 23094 },
    { region: 'Khmelnytskyi', regionUk: 'Хмельницька', regionEn: 'Khmelnytskyi', pricePerSqM: 24427 },
    { region: 'Cherkasy', regionUk: 'Черкаська', regionEn: 'Cherkasy', pricePerSqM: 25000 },
    { region: 'Chernivtsi', regionUk: 'Чернівецька', regionEn: 'Chernivtsi', pricePerSqM: 23495 },
    { region: 'Chernihiv', regionUk: 'Чернігівська', regionEn: 'Chernihiv', pricePerSqM: 25413 },
  ]

  // 2. Категорії користувачів
  const userCategories = [
    { code: 'military', nameUk: 'Військовослужбовець за контрактом', nameRu: 'Военнослужащий по контракту', nameEn: 'Contract Military', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
    { code: 'security', nameUk: 'Працівник сектору безпеки', nameRu: 'Работник сектора безопасности', nameEn: 'Security Sector Employee', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
    { code: 'medic', nameUk: 'Медичний працівник (державний/комунальний)', nameRu: 'Медицинский работник (государственный/коммунальный)', nameEn: 'Healthcare Worker (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
    { code: 'teacher', nameUk: 'Педагог (державний/комунальний)', nameRu: 'Педагог (государственный/коммунальный)', nameEn: 'Teacher (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
    { code: 'scientist', nameUk: 'Науковець (державний/комунальний)', nameRu: 'Ученый (государственный/коммунальный)', nameEn: 'Scientist (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
    { code: 'idp', nameUk: 'Внутрішньо переміщена особа (ВПО)', nameRu: 'Внутренне перемещенное лицо (ВПО)', nameEn: 'Internally Displaced Person (IDP)', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 20, frontlineMaxBuildingAge: 20 },
    { code: 'veteran', nameUk: 'Ветеран війни', nameRu: 'Ветеран войны', nameEn: 'War Veteran', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
    { code: 'regular', nameUk: 'Громадянин без власного житла', nameRu: 'Гражданин без собственного жилья', nameEn: 'Citizen without housing', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3, frontlineMaxBuildingAge: 3 },
  ]

  // 3. Типи нерухомості
  const propertyTypes = [
    { code: 'apartment', nameUk: 'Квартира', nameRu: 'Квартира', nameEn: 'Apartment', baseArea: 52.5, maxArea: 115.5 },
    { code: 'house', nameUk: 'Житловий будинок', nameRu: 'Жилой дом', nameEn: 'House', baseArea: 62.5, maxArea: 125.5 },
  ]

  // 4. Налаштування кредиту
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
  }

  // 5. Адмін
  const adminUser = {
    username: 'admin',
    password: adminPassword,
  }

  // Очищення існуючих даних
  await prisma.regionalPrice.deleteMany()
  await prisma.userCategory.deleteMany()
  await prisma.propertyType.deleteMany()
  await prisma.loanSettings.deleteMany()
  await prisma.adminUser.deleteMany()

  // Запис даних
  await prisma.regionalPrice.createMany({ data: regionalPrices })
  await prisma.userCategory.createMany({ data: userCategories })
  await prisma.propertyType.createMany({ data: propertyTypes })
  await prisma.loanSettings.create({ data: loanSettings })
  await prisma.adminUser.create({ data: adminUser })

  console.log('📊 Seed completed successfully!')
  console.log('👤 Admin user created with username: admin')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
