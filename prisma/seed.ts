import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Хешування пароля адміна
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)

  // 1. Регіональні ціни з doc.md (01.01.2025)
  const regionalPrices = [
    { region: 'Kyiv', regionUk: 'Київ', regionEn: 'Kyiv', pricePerSqM: 27863 },
    { region: 'Vinnytsia', regionUk: 'Вінницька', regionEn: 'Vinnytsia', pricePerSqM: 22989 },
    { region: 'Volyn', regionUk: 'Волинська', regionEn: 'Volyn', pricePerSqM: 22917 },
    { region: 'Dnipropetrovsk', regionUk: 'Дніпропетровська', regionEn: 'Dnipropetrovsk', pricePerSqM: 23114 },
    { region: 'Donetsk', regionUk: 'Донецька', regionEn: 'Donetsk', pricePerSqM: 25042 },
    { region: 'Zhytomyr', regionUk: 'Житомирська', regionEn: 'Zhytomyr', pricePerSqM: 20957 },
    { region: 'Zakarpattia', regionUk: 'Закарпатська', regionEn: 'Zakarpattia', pricePerSqM: 20696 },
    { region: 'Zaporizhzhia', regionUk: 'Запорізька', regionEn: 'Zaporizhzhia', pricePerSqM: 23090 },
    { region: 'IvanoFrankivsk', regionUk: 'Івано-Франківська', regionEn: 'Ivano-Frankivsk', pricePerSqM: 21438 },
    { region: 'KyivRegion', regionUk: 'Київська', regionEn: 'Kyiv', pricePerSqM: 23811 },
    { region: 'Kirovohrad', regionUk: 'Кіровоградська', regionEn: 'Kirovohrad', pricePerSqM: 20262 },
    { region: 'Luhansk', regionUk: 'Луганська', regionEn: 'Luhansk', pricePerSqM: 22870 },
    { region: 'Lviv', regionUk: 'Львівська', regionEn: 'Lviv', pricePerSqM: 23711 },
    { region: 'Mykolaiv', regionUk: 'Миколаївська', regionEn: 'Mykolaiv', pricePerSqM: 23805 },
    { region: 'Odesa', regionUk: 'Одеська', regionEn: 'Odesa', pricePerSqM: 22840 },
    { region: 'Poltava', regionUk: 'Полтавська', regionEn: 'Poltava', pricePerSqM: 21198 },
    { region: 'Rivne', regionUk: 'Рівненська', regionEn: 'Rivne', pricePerSqM: 23416 },
    { region: 'Sumy', regionUk: 'Сумська', regionEn: 'Sumy', pricePerSqM: 22366 },
    { region: 'Ternopil', regionUk: 'Тернопільська', regionEn: 'Ternopil', pricePerSqM: 22347 },
    { region: 'Kharkiv', regionUk: 'Харківська', regionEn: 'Kharkiv', pricePerSqM: 25058 },
    { region: 'Kherson', regionUk: 'Херсонська', regionEn: 'Kherson', pricePerSqM: 21691 },
    { region: 'Khmelnytskyi', regionUk: 'Хмельницька', regionEn: 'Khmelnytskyi', pricePerSqM: 22944 },
    { region: 'Cherkasy', regionUk: 'Черкаська', regionEn: 'Cherkasy', pricePerSqM: 23482 },
    { region: 'Chernivtsi', regionUk: 'Чернівецька', regionEn: 'Chernivtsi', pricePerSqM: 22068 },
    { region: 'Chernihiv', regionUk: 'Чернігівська', regionEn: 'Chernihiv', pricePerSqM: 23870 },
  ]

  // 2. Категорії користувачів
  const userCategories = [
    { code: 'military', nameUk: 'Військовослужбовець за контрактом', nameRu: 'Военнослужащий по контракту', nameEn: 'Contract Military', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'medic', nameUk: 'Медичний працівник (державний/комунальний)', nameRu: 'Медицинский работник (государственный/коммунальный)', nameEn: 'Healthcare Worker (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'teacher', nameUk: 'Педагог (державний/комунальний)', nameRu: 'Педагог (государственный/коммунальный)', nameEn: 'Teacher (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'scientist', nameUk: 'Науковець (державний/комунальний)', nameRu: 'Ученый (государственный/коммунальный)', nameEn: 'Scientist (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3 },
    { code: 'idp', nameUk: 'Внутрішньо переміщена особа (ВПО)', nameRu: 'Внутренне перемещенное лицо (ВПО)', nameEn: 'Internally Displaced Person (IDP)', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 10 },
    { code: 'veteran', nameUk: 'Ветеран війни', nameRu: 'Ветеран войны', nameEn: 'War Veteran', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3 },
    { code: 'regular', nameUk: 'Громадянин без власного житла', nameRu: 'Гражданин без собственного жилья', nameEn: 'Citizen without housing', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3 },
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
