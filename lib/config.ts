// Source: Мінрозвитку №1155 від 16.07.2025 (prices as of 01.07.2025)
// Program rules: Постанова КМУ №856, effective 10.02.2026

export const FRONTLINE_REGIONS = ['Chernihiv', 'Sumy', 'Kharkiv', 'Zaporizhzhia', 'Kherson']

export const REGIONAL_PRICES: Record<string, { regionUk: string; regionEn: string; pricePerSqM: number }> = {
  Kyiv: { regionUk: 'Київ', regionEn: 'Kyiv', pricePerSqM: 29665 },
  Vinnytsia: { regionUk: 'Вінницька', regionEn: 'Vinnytsia', pricePerSqM: 24475 },
  Volyn: { regionUk: 'Волинська', regionEn: 'Volyn', pricePerSqM: 24399 },
  Dnipropetrovsk: { regionUk: 'Дніпропетровська', regionEn: 'Dnipropetrovsk', pricePerSqM: 24608 },
  Donetsk: { regionUk: 'Донецька', regionEn: 'Donetsk', pricePerSqM: 26661 },
  Zhytomyr: { regionUk: 'Житомирська', regionEn: 'Zhytomyr', pricePerSqM: 22312 },
  Zakarpattia: { regionUk: 'Закарпатська', regionEn: 'Zakarpattia', pricePerSqM: 22034 },
  Zaporizhzhia: { regionUk: 'Запорізька', regionEn: 'Zaporizhzhia', pricePerSqM: 24583 },
  IvanoFrankivsk: { regionUk: 'Івано-Франківська', regionEn: 'Ivano-Frankivsk', pricePerSqM: 22824 },
  KyivRegion: { regionUk: 'Київська', regionEn: 'Kyiv Region', pricePerSqM: 25351 },
  Kirovohrad: { regionUk: 'Кіровоградська', regionEn: 'Kirovohrad', pricePerSqM: 21572 },
  Luhansk: { regionUk: 'Луганська', regionEn: 'Luhansk', pricePerSqM: 24348 },
  Lviv: { regionUk: 'Львівська', regionEn: 'Lviv', pricePerSqM: 25244 },
  Mykolaiv: { regionUk: 'Миколаївська', regionEn: 'Mykolaiv', pricePerSqM: 25344 },
  Odesa: { regionUk: 'Одеська', regionEn: 'Odesa', pricePerSqM: 24316 },
  Poltava: { regionUk: 'Полтавська', regionEn: 'Poltava', pricePerSqM: 22569 },
  Rivne: { regionUk: 'Рівненська', regionEn: 'Rivne', pricePerSqM: 24930 },
  Sumy: { regionUk: 'Сумська', regionEn: 'Sumy', pricePerSqM: 23812 },
  Ternopil: { regionUk: 'Тернопільська', regionEn: 'Ternopil', pricePerSqM: 23791 },
  Kharkiv: { regionUk: 'Харківська', regionEn: 'Kharkiv', pricePerSqM: 26678 },
  Kherson: { regionUk: 'Херсонська', regionEn: 'Kherson', pricePerSqM: 23094 },
  Khmelnytskyi: { regionUk: 'Хмельницька', regionEn: 'Khmelnytskyi', pricePerSqM: 24427 },
  Cherkasy: { regionUk: 'Черкаська', regionEn: 'Cherkasy', pricePerSqM: 25000 },
  Chernivtsi: { regionUk: 'Чернівецька', regionEn: 'Chernivtsi', pricePerSqM: 23495 },
  Chernihiv: { regionUk: 'Чернігівська', regionEn: 'Chernihiv', pricePerSqM: 25413 },
}

export const USER_CATEGORIES: Record<
  string,
  {
    nameUk: string
    nameRu: string
    nameEn: string
    ratePeriod1: number
    ratePeriod2: number
    maxBuildingAge: number
    frontlineMaxBuildingAge: number
  }
> = {
  military: { nameUk: 'Військовослужбовець за контрактом', nameRu: 'Военнослужащий по контракту', nameEn: 'Contract Military', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
  security: { nameUk: 'Працівник сектору безпеки', nameRu: 'Работник сектора безопасности', nameEn: 'Security Sector Employee', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
  medic: { nameUk: 'Медичний працівник (державний/комунальний)', nameRu: 'Медицинский работник (государственный/коммунальный)', nameEn: 'Healthcare Worker (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
  teacher: { nameUk: 'Педагог (державний/комунальний)', nameRu: 'Педагог (государственный/коммунальный)', nameEn: 'Teacher (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
  scientist: { nameUk: 'Науковець (державний/комунальний)', nameRu: 'Ученый (государственный/коммунальный)', nameEn: 'Scientist (Public)', ratePeriod1: 0.03, ratePeriod2: 0.06, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
  idp: { nameUk: 'Внутрішньо переміщена особа (ВПО)', nameRu: 'Внутренне перемещенное лицо (ВПО)', nameEn: 'Internally Displaced Person', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 20, frontlineMaxBuildingAge: 20 },
  veteran: { nameUk: 'Ветеран війни', nameRu: 'Ветеран войны', nameEn: 'War Veteran', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3, frontlineMaxBuildingAge: 20 },
  regular: { nameUk: 'Громадянин без власного житла', nameRu: 'Гражданин без собственного жилья', nameEn: 'Citizen without housing', ratePeriod1: 0.07, ratePeriod2: 0.10, maxBuildingAge: 3, frontlineMaxBuildingAge: 3 },
}

export const PROPERTY_TYPES: Record<string, { nameUk: string; nameRu: string; nameEn: string; baseArea: number; maxArea: number }> = {
  apartment: { nameUk: 'Квартира', nameRu: 'Квартира', nameEn: 'Apartment', baseArea: 52.5, maxArea: 115.5 },
  house: { nameUk: 'Житловий будинок', nameRu: 'Жилой дом', nameEn: 'House', baseArea: 62.5, maxArea: 125.5 },
}

export const LOAN_SETTINGS = {
  minLoanAmount: 200000,
  maxLoanAmount: 5000000,
  minTermMonths: 12,
  maxTermMonths: 240,
  downPaymentPercent: 20,
  downPaymentPercent26: 10,
  maxAreaExcessPercent: 10,
  maxPriceExcessPercent: 10,
}
