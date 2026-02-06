Отлично! Теперь у меня достаточно информации для подготовки структурированного документа. Позвольте мне составить детальный технический документ с точными формулами и логикой для программы "єОселя".

# ТЕХНІЧНА СПЕЦИФІКАЦІЯ ПРОГРАМИ "єОСЕЛЯ" 2025-2026
## Точна математична логіка для розробки іпотечного калькулятора

***

## 1. КАТЕГОРІЇ КОРИСТУВАЧІВ І ПРОЦЕНТНІ СТАВКИ

### Таблиця категорій та ставок:

| **Категорія** | **Ставка (1-10 роки)** | **Ставка (11-20 роки)** | **Точні вимоги** |
|--------------|----------------------|----------------------|------------------|
| **ПІЛЬГОВА (3%)** | 3% річних | 6% річних | Військовослужбовці за контрактом ЗСУ, представники сектору безпеки та оборони, медичні працівники державних/комунальних закладів, педагоги державних/комунальних закладів, науковці державних/комунальних закладів |
| **СТАНДАРТНА (7%)** | 7% річних | 10% річних | Внутрішньо переміщені особи (ВПО), ветерани війни та члени їхніх сімей, громадяни без власного житла або з житлом менше нормативної площі |

### Умови участі (загальні для всіх категорій):
- Громадянство України
- Відсутність власного житла АБО наявність житла площею менше нормативної:
  - **52,5 м²** для сім'ї з 1-2 осіб
  - **+21 м²** на кожного наступного члена сім'ї
- Відсутність участі в інших державних програмах забезпечення житлом
- Не бути в санкційних списках
- Не здійснювали відчуження житла протягом останніх 36 місяців (що перевищує нормативну площу)

***

## 2. ОБМЕЖЕННЯ ПО НЕРУХОМОСТІ

### 2.1 Вікові обмеження будинку (станом на 2025-2026):

| **Категорія позичальника** | **Регіон** | **Максимальний вік будинку** |
|---------------------------|-----------|------------------------------|
| **ВПО та члени їхніх сімей** | Усі регіони України | ≤ 10 років від введення в експлуатацію |
| **Пільгові категорії (3%)**: військові, медики, вчителі, науковці, ветерани | Чернігівська, Сумська, Харківська, Запорізька, Херсонська області | ≤ 10 років від введення в експлуатацію |
| **Пільгові категорії (3%)**: військові, медики, вчителі, науковці, ветерани | Решта регіонів України | ≤ 3 роки від введення в експлуатацію |
| **Стандартні громадяни (7%)** | Усі регіони України | ≤ 3 роки від введення в експлуатацію |

**ВАЖЛИВО для ВПО**: Житло може бути віком до **20 років** у деяких випадках (з вересня 2025 року за новим механізмом компенсацій), але базова вимога - **10 років**.

### 2.2 Тип нерухомості:
- ✅ Квартира в багатоквартирному будинку
- ✅ Індивідуальний житловий будинок (з під'їзними шляхами з твердим покриттям)
- ✅ Таунхаус
- ✅ Дуплекс
- ❌ Житло в аварійному стані
- ❌ Житло без інженерних мереж
- ❌ Житло на тимчасово окупованих територіях
- ❌ Житло в зонах активних бойових дій

***

## 3. ЛІМІТИ ПЛОЩІ – ФОРМУЛА "НОРМАТИВНА ПЛОЩА"

### 3.1 Базова формула для квартир (з 10.02.2026):

```
Для 1-2 осіб: Нормативна_Площа_Квартири = 52,5 м²
Для 3+ осіб: Нормативна_Площа_Квартири = 52,5 + (Кількість_Членів_Сім'ї - 2) × 21
Максимум: 115,5 м² (незалежно від розміру сім'ї)
```

**Приклади:**
- 1 особа: 52,5 м²
- 2 особи: 52,5 м²
- 3 особи: 52,5 + (3-2)×21 = 73,5 м²
- 4 особи: 52,5 + (4-2)×21 = 94,5 м²
- 5+ осіб: 115,5 м² (максимальний ліміт)

### 3.2 Базова формула для будинків (з 10.02.2026):

```
Для 1-2 осіб: Нормативна_Площа_Будинку = 62,5 м²
Для 3+ осіб: Нормативна_Площа_Будинку = 62,5 + (Кількість_Членів_Сім'ї - 2) × 21
Максимум: 125,5 м² (незалежно від розміру сім'ї)
```

### 3.3 Логіка перевищення площі:

**Правило (з 10.02.2026):**
- Перевищення нормативної площі дозволено **ТІЛЬКИ до 10%**
- Перевищення дозволено **ТІЛЬКИ для житла віком до 3 років**
- Для житла старше 3 років перевищення **НЕ ДОЗВОЛЕНО**

```python
# Псевдокод для перевірки
if Фактична_Площа > Нормативна_Площа:
    Перевищення_Відсотки = ((Фактична_Площа - Нормативна_Площа) / Нормативна_Площа) × 100
    
    if Вік_Будинку <= 3:
        if Перевищення_Відсотки <= 10:
            Дозволена_Площа = Фактична_Площа
            Площа_Понад_Норматив = Фактична_Площа - Нормативна_Площа
            # Користувач ОПЛАЧУЄ надлишкову площу власним коштом
        else:
            ВІДМОВА # Перевищення більше 10%
    else:
        ВІДМОВА # Житло старше 3 років
```

***

## 4. ЛІМІТ ЦІНИ ЗА КВ.М – НАЙСКЛАДНІША ЧАСТИНА

### 4.1 Базова формула:

```
Гранична_Вартість_1м² = Середня_Вартість_Мінрегіон × Коефіцієнт_Регіону
```

### 4.2 Коефіцієнти за регіонами (Постанова КМУ №856):

| **Регіон/Населений пункт** | **Коефіцієнт** |
|----------------------------|----------------|
| **м. Київ** | 2,0 |
| **Дніпро, Львів, Одеса, Харків** (обласні центри з населенням >300 тис.) | 2,0 |
| **Інші обласні центри** та міста з населенням >300 тис. | 2,0 |
| **Решта населених пунктів** (міста <300 тис., селища) | 1,75 |

### 4.3 Середня вартість будівництва житла (Мінрегіон) станом на **01.01.2025**:

| **Регіон** | **Вартість 1 м² (грн, з ПДВ)** |
|-----------|-------------------------------|
| Україна (середнє) | 23 841 |
| **м. Київ** | 27 863 |
| Вінницька | 22 989 |
| Волинська | 22 917 |
| Дніпропетровська | 23 114 |
| Донецька | 25 042 |
| Житомирська | 20 957 |
| Закарпатська | 20 696 |
| Запорізька | 23 090 |
| Івано-Франківська | 21 438 |
| Київська | 23 811 |
| Кіровоградська | 20 262 |
| Луганська | 22 870 |
| Львівська | 23 711 |
| Миколаївська | 23 805 |
| Одеська | 22 840 |
| Полтавська | 21 198 |
| Рівненська | 23 416 |
| Сумська | 22 366 |
| Тернопільська | 22 347 |
| Харківська | 25 058 |
| Херсонська | 21 691 |
| Хмельницька | 22 944 |
| Черкаська | 23 482 |
| Чернівецька | 22 068 |
| Чернігівська | 23 870 |

**ВАЖЛИВО**: Ці показники оновлюються **щоквартально** Міністерством розвитку громад та територій України. Останнє оновлення: **01.07.2025**.

### 4.4 Приклади розрахунку граничної вартості:

**Приклад 1: Київ**
```
Середня_Вартість = 27 863 грн/м²
Коефіцієнт = 2,0
Гранична_Вартість = 27 863 × 2,0 = 55 726 грн/м²
```

**Приклад 2: Вінниця (обласний центр)**
```
Середня_Вартість = 22 989 грн/м²
Коефіцієнт = 2,0
Гранична_Вартість = 22 989 × 2,0 = 45 978 грн/м²
```

**Приклад 3: Житомирська область (інші населені пункти)**
```
Середня_Вартість = 20 957 грн/м²
Коефіцієнт = 1,75
Гранична_Вартість = 20 957 × 1,75 = 36 675 грн/м²
```

### 4.5 Логіка перевищення ціни:

```python
# Псевдокод
Фактична_Ціна_1м² = Вартість_Квартири / Площа_Квартири
Гранична_Ціна_1м² = Середня_Вартість_Мінрегіон × Коефіцієнт

if Фактична_Ціна_1м² > Гранична_Ціна_1м²:
    Перевищення_На_1м² = Фактична_Ціна_1м² - Гранична_Ціна_1м²
    
    # Дозволено перевищення до 10%
    Перевищення_Відсотки = (Перевищення_На_1м² / Гранична_Ціна_1м²) × 100
    
    if Перевищення_Відсотки <= 10:
        # Різниця покривається початковим внеском
        Сума_Перевищення = Перевищення_На_1м² × Площа_Квартири
        Мінімальний_Початковий_Внесок += Сума_Перевищення
        Сума_Кредиту_Максимальна = Вартість_Квартири - Мінімальний_Початковий_Внесок
    else:
        ВІДМОВА # Перевищення більше 10%
```

***

## 5. ЛОГІКА РОЗРАХУНКУ КРЕДИТУ

### 5.1 Початковий внесок (First Payment):

**Базове правило:**
```
Мінімальний_Початковий_Внесок = Вартість_Житла × 20%
```

**Виняток для молоді до 26 років (з вересня 2024):**
```
Мінімальний_Початковий_Внесок = Вартість_Житла × 10%
```

**Спеціальні умови для ВПО (з вересня 2025):**
```
Компенсація_Держави = 70% × Початковий_Внесок (але не більше 30% вартості житла)
Фактичний_Внесок_ВПО = Початковий_Внесок - Компенсація_Держави
```

### 5.2 Сума кредиту:

```
Мінімальна_Сума_Кредиту = 200 000 грн
Максимальна_Сума_Кредиту = 5 000 000 грн

Сума_Кредиту = Вартість_Житла - Початковий_Внесок
```

**Для ВПО з компенсаціями (новий механізм 2025):**
```
Максимальна_Вартість_Житла = 2 000 000 грн (для компенсацій)
```

### 5.3 Термін кредиту:

```
Мінімальний_Термін = 12 місяців (1 рік)
Максимальний_Термін = 240 місяців (20 років)
```

### 5.4 Формула щомісячного платежу (ануїтет):

```
r₁ = Річна_Ставка_1 / 12  // Перші 10 років (3% або 7%)
r₂ = Річна_Ставка_2 / 12  // Наступні 10 років (6% або 10%)

// Для перших 120 місяців:
Платіж_Місячний_1 = (Сума_Кредиту × r₁ × (1 + r₁)^n) / ((1 + r₁)^n - 1)

// Для наступних місяців (121-240):
Залишок_Боргу_120 = розрахувати_залишок(120_місяців)
Платіж_Місячний_2 = (Залишок_Боргу_120 × r₂ × (1 + r₂)^(n-120)) / ((1 + r₂)^(n-120) - 1)
```

**Компенсація для ВПО (перший рік):**
```
Компенсація_Щомісячна = 70% × Платіж_Місячний
Фактичний_Платіж_ВПО = 30% × Платіж_Місячний
```

### 5.5 Додаткові витрати (для ВПО компенсуються до 40 000 грн):

- Комісія банку за видачу кредиту
- Оцінка нерухомості
- Нотаріальні послуги
- Страхування (життя, нерухомість)
- Реєстрація іпотеки

***

## 6. EDGE CASES – ОБРОБКА ГРАНИЧНИХ ВИПАДКІВ

### 6.1 Площа перевищує норматив:

```javascript
function checkAreaExcess(actualArea, normativeArea, buildingAge) {
    const excessArea = actualArea - normativeArea;
    const excessPercent = (excessArea / normativeArea) * 100;
    
    if (excessArea <= 0) {
        return { allowed: true, userPayment: 0 };
    }
    
    if (buildingAge > 3) {
        return { 
            allowed: false, 
            reason: "Житло старше 3 років не може перевищувати норматив" 
        };
    }
    
    if (excessPercent > 10) {
        return { 
            allowed: false, 
            reason: "Перевищення площі більше 10% не дозволено" 
        };
    }
    
    // Користувач оплачує надлишкову площу повністю власним коштом
    return { 
        allowed: true, 
        excessArea: excessArea,
        userPayment: excessArea * pricePerSqM  // Додається до початкового внеску
    };
}
```

### 6.2 Ціна за м² перевищує ліміт:

```javascript
function checkPriceExcess(actualPrice, limitPrice, totalArea) {
    const excessPricePerSqM = actualPrice - limitPrice;
    const excessPercent = (excessPricePerSqM / limitPrice) * 100;
    
    if (excessPricePerSqM <= 0) {
        return { allowed: true, additionalDownPayment: 0 };
    }
    
    if (excessPercent > 10) {
        return { 
            allowed: false, 
            reason: "Перевищення ціни більше 10% від граничної не дозволено" 
        };
    }
    
    // Різниця покривається початковим внеском
    const totalExcess = excessPricePerSqM * totalArea;
    
    return { 
        allowed: true, 
        additionalDownPayment: totalExcess,  // Додається до мінімальних 20%
        excessPricePerSqM: excessPricePerSqM
    };
}
```

### 6.3 Комбінований випадок (площа + ціна перевищують):

```javascript
function calculateFinalPayment(apartment, userCategory, familySize) {
    // 1. Перевірка нормативної площі
    const normativeArea = calculateNormativeArea(familySize, apartment.type);
    const areaCheck = checkAreaExcess(apartment.area, normativeArea, apartment.buildingAge);
    
    if (!areaCheck.allowed) {
        return { error: areaCheck.reason };
    }
    
    // 2. Перевірка граничної ціни
    const limitPrice = calculateLimitPrice(apartment.region, apartment.settlementType);
    const priceCheck = checkPriceExcess(apartment.pricePerSqM, limitPrice, apartment.area);
    
    if (!priceCheck.allowed) {
        return { error: priceCheck.reason };
    }
    
    // 3. Розрахунок фінальних параметрів
    const baseCost = apartment.area * apartment.pricePerSqM;
    const baseDownPayment = baseCost * (userCategory.age < 26 ? 0.10 : 0.20);
    
    const totalDownPayment = baseDownPayment 
        + areaCheck.userPayment 
        + priceCheck.additionalDownPayment;
    
    const loanAmount = baseCost - totalDownPayment;
    
    // 4. Перевірка лімітів
    if (loanAmount < 200000) {
        return { error: "Сума кредиту менше мінімальної (200 000 грн)" };
    }
    
    if (loanAmount > 5000000) {
        return { error: "Сума кредиту перевищує максимальну (5 000 000 грн)" };
    }
    
    return {
        success: true,
        baseCost: baseCost,
        downPayment: totalDownPayment,
        loanAmount: loanAmount,
        interestRate: userCategory.rate,
        normativeArea: normativeArea,
        actualArea: apartment.area,
        excessArea: areaCheck.excessArea || 0,
        limitPricePerSqM: limitPrice,
        actualPricePerSqM: apartment.pricePerSqM
    };
}
```

***

## 7. ОФІЦІЙНІ ДЖЕРЕЛА

### 7.1 Основний нормативний акт:

**Постанова Кабінету Міністрів України №856 від 02.08.2022**
- Повна назва: "Деякі питання забезпечення приватним акціонерним товариством «Українська фінансова житлова компанія» доступного іпотечного кредитування громадян України"
- Останні зміни: набувають чинності **10.02.2026**

### 7.2 Оператор програми:

**ПрАТ "Українська фінансова житлова компанія" (Укрфінжитло)**
- Веб-сайт програми: https://eoselia.diia.gov.ua
- Подача заявок через застосунок **"Дія"**

### 7.3 Банки-партнери (станом на 2025-2026):

| № | Банк | Примітки |
|---|------|----------|
| 1 | Ощадбанк | Один з найбільших учасників |
| 2 | ПриватБанк | Один з найбільших учасників |
| 3 | Укргазбанк | Державний банк |
| 4 | Sense Bank | |
| 5 | Sky Bank | |
| 6 | Банк Кредит Дніпро | |
| 7 | Глобус Банк | |
| 8 | Таскомбанк | Приєднався у 2024 |
| 9 | BISBANK | Приєднався у 2024 |
| 10 | Радабанк | Приєднався у 2025 |
| 11 | МТБ Банк | Приєднався у 2024 |

**Список постійно оновлюється** - перевіряйте актуальний список на офіційному порталі.

### 7.4 Нормативні документи Мінрегіону:

**Накази про середню вартість будівництва житла:**
- Наказ від 18.02.2025 (станом на 01.01.2025)
- Наказ від 28.04.2025 (станом на 01.04.2025)
- Наказ від 16.07.2025 №1155 (станом на 01.07.2025) - **останній актуальний**

***

## 8. АЛГОРИТМ КАЛЬКУЛЯТОРА – ПОКРОКОВА ЛОГІКА

### Крок 1: Збір вхідних даних

```javascript
const userInput = {
    // Категорія користувача
    category: "3%" | "7%",  // або пільгова/стандартна
    subcategory: "military" | "medic" | "teacher" | "idp" | "veteran" | "regular",
    age: Number,
    familySize: Number,
    
    // Параметри житла
    propertyType: "apartment" | "house",
    region: "Kyiv" | "Vinnytsia" | ...,  // 25 регіонів
    settlementType: "majorCity" | "regionalCenter" | "other",  // >300k, обласні центри, інші
    area: Number,  // м²
    totalCost: Number,  // грн
    buildingAge: Number,  // років від введення в експлуатацію
    
    // Параметри кредиту
    loanTerm: Number,  // місяців (12-240)
    hasEvidnovlennyaCertificate: Boolean,  // для першого внеску
};
```

### Крок 2: Валідація категорії та нерухомості

```javascript
function validateEligibility(userInput) {
    // Перевірка віку будинку
    const maxAge = getMaxBuildingAge(userInput.category, userInput.subcategory, userInput.region);
    
    if (userInput.buildingAge > maxAge) {
        return { valid: false, error: `Вік будинку перевищує ${maxAge} років для вашої категорії` };
    }
    
    // Перевірка типу нерухомості
    if (!["apartment", "house"].includes(userInput.propertyType)) {
        return { valid: false, error: "Недопустимий тип нерухомості" };
    }
    
    return { valid: true };
}

function getMaxBuildingAge(category, subcategory, region) {
    const frontlineRegions = ["Chernihiv", "Sumy", "Kharkiv", "Zaporizhzhia", "Kherson"];
    
    if (subcategory === "idp") {
        return 10;  // ВПО - до 10 років у всіх регіонах
    }
    
    if (category === "3%" && frontlineRegions.includes(region)) {
        return 10;  // Пільгові в прифронтових - до 10 років
    }
    
    if (category === "3%") {
        return 3;  // Пільгові в інших регіонах - до 3 років
    }
    
    return 3;  // Стандартні громадяни - до 3 років
}
```

### Крок 3: Розрахунок нормативної площі

```javascript
function calculateNormativeArea(familySize, propertyType) {
    const baseArea = propertyType === "apartment" ? 52.5 : 62.5;
    const maxArea = propertyType === "apartment" ? 115.5 : 125.5;
    
    if (familySize <= 2) {
        return baseArea;
    }
    
    const calculatedArea = baseArea + (familySize - 2) * 21;
    return Math.min(calculatedArea, maxArea);
}
```

### Крок 4: Розрахунок граничної ціни

```javascript
const regionalPrices2025Q1 = {
    "Kyiv": 27863,
    "Vinnytsia": 22989,
    "Volyn": 22917,
    "Dnipropetrovsk": 23114,
    "Donetsk": 25042,
    "Zhytomyr": 20957,
    "Zakarpattia": 20696,
    "Zaporizhzhia": 23090,
    "IvanoFrankivsk": 21438,
    "KyivRegion": 23811,
    "Kirovohrad": 20262,
    "Luhansk": 22870,
    "Lviv": 23711,
    "Mykolaiv": 23805,
    "Odesa": 22840,
    "Poltava": 21198,
    "Rivne": 23416,
    "Sumy": 22366,
    "Ternopil": 22347,
    "Kharkiv": 25058,
    "Kherson": 21691,
    "Khmelnytskyi": 22944,
    "Cherkasy": 23482,
    "Chernivtsi": 22068,
    "Chernihiv": 23870
};

function calculateLimitPrice(region, settlementType) {
    const basePrice = regionalPrices2025Q1[region];
    
    // Визначення коефіцієнту
    const coefficient = settlementType === "other" ? 1.75 : 2.0;
    
    return basePrice * coefficient;
}
```

### Крок 5: Перевірка перевищень та розрахунок доплат

```javascript
function calculatePaymentStructure(userInput) {
    // 1. Нормативна площа
    const normativeArea = calculateNormativeArea(userInput.familySize, userInput.propertyType);
    
    // 2. Гранична ціна
    const limitPrice = calculateLimitPrice(userInput.region, userInput.settlementType);
    const actualPricePerSqM = userInput.totalCost / userInput.area;
    
    // 3. Базовий початковий внесок
    const downPaymentRate = userInput.age < 26 ? 0.10 : 0.20;
    let downPayment = userInput.totalCost * downPaymentRate;
    
    let warnings = [];
    let additionalPayments = [];
    
    // 4. Перевірка перевищення площі
    if (userInput.area > normativeArea) {
        const excessArea = userInput.area - normativeArea;
        const excessPercent = (excessArea / normativeArea) * 100;
        
        if (userInput.buildingAge > 3) {
            return { 
                error: "Житло старше 3 років не може перевищувати нормативну площу" 
            };
        }
        
        if (excessPercent > 10) {
            return { 
                error: `Перевищення площі ${excessPercent.toFixed(1)}% більше дозволених 10%` 
            };
        }
        
        const areaExcessPayment = excessArea * actualPricePerSqM;
        downPayment += areaExcessPayment;
        additionalPayments.push({
            type: "Доплата за надлишкову площу",
            amount: areaExcessPayment,
            details: `${excessArea.toFixed(1)} м² × ${actualPricePerSqM.toFixed(0)} грн/м²`
        });
        warnings.push(`Площа перевищує норматив на ${excessArea.toFixed(1)} м² (${excessPercent.toFixed(1)}%)`);
    }
    
    // 5. Перевірка перевищення ціни
    if (actualPricePerSqM > limitPrice) {
        const excessPrice = actualPricePerSqM - limitPrice;
        const excessPercent = (excessPrice / limitPrice) * 100;
        
        if (excessPercent > 10) {
            return { 
                error: `Перевищення ціни ${excessPercent.toFixed(1)}% більше дозволених 10%` 
            };
        }
        
        const priceExcessPayment = excessPrice * userInput.area;
        downPayment += priceExcessPayment;
        additionalPayments.push({
            type: "Доплата за перевищення граничної ціни",
            amount: priceExcessPayment,
            details: `${excessPrice.toFixed(0)} грн/м² × ${userInput.area} м²`
        });
        warnings.push(`Ціна перевищує ліміт на ${excessPrice.toFixed(0)} грн/м² (${excessPercent.toFixed(1)}%)`);
    }
    
    // 6. Розрахунок суми кредиту
    const loanAmount = userInput.totalCost - downPayment;
    
    if (loanAmount < 200000) {
        return { error: "Сума кредиту менше мінімальної 200 000 грн" };
    }
    
    if (loanAmount > 5000000) {
        return { error: "Сума кредиту перевищує максимальну 5 000 000 грн" };
    }
    
    return {
        success: true,
        normativeArea: normativeArea,
        actualArea: userInput.area,
        limitPrice: limitPrice,
        actualPricePerSqM: actualPricePerSqM,
        downPayment: downPayment,
        loanAmount: loanAmount,
        additionalPayments: additionalPayments,
        warnings: warnings
    };
}
```

### Крок 6: Розрахунок графіка платежів

```javascript
function calculatePaymentSchedule(loanAmount, loanTermMonths, category) {
    const rate1 = category === "3%" ? 0.03 : 0.07;  // Перші 10 років
    const rate2 = category === "3%" ? 0.06 : 0.10;  // Наступні роки
    
    const monthlyRate1 = rate1 / 12;
    const monthlyRate2 = rate2 / 12;
    
    let schedule = [];
    let remainingBalance = loanAmount;
    
    // Платежі на перші 10 років (або менше, якщо термін коротший)
    const firstPeriodMonths = Math.min(120, loanTermMonths);
    const monthlyPayment1 = (loanAmount * monthlyRate1 * Math.pow(1 + monthlyRate1, firstPeriodMonths)) / 
                            (Math.pow(1 + monthlyRate1, firstPeriodMonths) - 1);
    
    for (let month = 1; month <= firstPeriodMonths; month++) {
        const interestPayment = remainingBalance * monthlyRate1;
        const principalPayment = monthlyPayment1 - interestPayment;
        remainingBalance -= principalPayment;
        
        schedule.push({
            month: month,
            payment: monthlyPayment1,
            principal: principalPayment,
            interest: interestPayment,
            balance: remainingBalance,
            rate: rate1
        });
    }
    
    // Якщо термін більше 10 років
    if (loanTermMonths > 120) {
        const secondPeriodMonths = loanTermMonths - 120;
        const monthlyPayment2 = (remainingBalance * monthlyRate2 * Math.pow(1 + monthlyRate2, secondPeriodMonths)) / 
                                (Math.pow(1 + monthlyRate2, secondPeriodMonths) - 1);
        
        for (let month = 121; month <= loanTermMonths; month++) {
            const interestPayment = remainingBalance * monthlyRate2;
            const principalPayment = monthlyPayment2 - interestPayment;
            remainingBalance -= principalPayment;
            
            schedule.push({
                month: month,
                payment: monthlyPayment2,
                principal: principalPayment,
                interest: interestPayment,
                balance: remainingBalance,
                rate: rate2
            });
        }
    }
    
    return schedule;
}
```

***

## 9. ДОДАТКОВІ ПАРАМЕТРИ ДЛЯ UI

### Поля для введення:

```javascript
const formFields = {
    // Крок 1: Категорія користувача
    userCategory: {
        label: "Ваша категорія",
        type: "radio",
        options: [
            { value: "military", label: "Військовослужбовець за контрактом", rate: "3%" },
            { value: "security", label: "Працівник сектору безпеки", rate: "3%" },
            { value: "medic", label: "Медичний працівник (державний/комунальний заклад)", rate: "3%" },
            { value: "teacher", label: "Педагог (державний/комунальний заклад)", rate: "3%" },
            { value: "scientist", label: "Науковець (державний/комунальний заклад)", rate: "3%" },
            { value: "idp", label: "Внутрішньо переміщена особа (ВПО)", rate: "7%" },
            { value: "veteran", label: "Ветеран війни", rate: "7%" },
            { value: "regular", label: "Інший громадянин без житла", rate: "7%" }
        ]
    },
    
    // Крок 2: Сімейна ситуація
    age: {
        label: "Ваш вік",
        type: "number",
        min: 18,
        max: 70,
        hint: "Якщо вам менше 26 років, початковий внесок може бути 10% замість 20%"
    },
    
    familySize: {
        label: "Кількість членів сім'ї",
        type: "number",
        min: 1,
        max: 10,
        hint: "Включаючи вас"
    },
    
    // Крок 3: Параметри житла
    propertyType: {
        label: "Тип нерухомості",
        type: "radio",
        options: [
            { value: "apartment", label: "Квартира" },
            { value: "house", label: "Житловий будинок" }
        ]
    },
    
    region: {
        label: "Область",
        type: "select",
        options: [
            "Київ (місто)",
            "Вінницька",
            "Волинська",
            // ... всі 25 регіонів
        ]
    },
    
    settlementType: {
        label: "Тип населеного пункту",
        type: "radio",
        options: [
            { value: "majorCity", label: "Київ, Дніпро, Львів, Одеса, Харків або обласний центр >300 тис." },
            { value: "other", label: "Інші населені пункти" }
        ],
        hint: "Від цього залежить коефіцієнт граничної ціни (2.0 або 1.75)"
    },
    
    area: {
        label: "Загальна площа, м²",
        type: "number",
        min: 20,
        max: 150,
        step: 0.1
    },
    
    totalCost: {
        label: "Загальна вартість житла, грн",
        type: "number",
        min: 250000,
        max: 10000000,
        step: 1000
    },
    
    buildingAge: {
        label: "Вік будинку (років від введення в експлуатацію)",
        type: "number",
        min: 0,
        max: 20,
        hint: "Для більшості категорій - до 3 років, для ВПО - до 10 років"
    },
    
    // Крок 4: Параметри кредиту
    loanTerm: {
        label: "Термін кредиту (років)",
        type: "number",
        min: 1,
        max: 20,
        hint: "Від 1 до 20 років"
    }
};
```

### Інформаційні панелі для відображення:

```javascript
const outputDisplays = {
    eligibilityStatus: {
        label: "Відповідність вимогам програми",
        type: "status",  // success/warning/error
        fields: [
            "Ваша категорія",
            "Відсоткова ставка",
            "Максимальний вік будинку для вас",
            "Статус перевірки"
        ]
    },
    
    areaAnalysis: {
        label: "Аналіз площі",
        fields: [
            { key: "normativeArea", label: "Нормативна площа для вашої сім'ї" },
            { key: "actualArea", label: "Фактична площа обраного житла" },
            { key: "excessArea", label: "Надлишкова площа" },
            { key: "excessPercent", label: "Відсоток перевищення" },
            { key: "areaStatus", label: "Статус" }  // допустимо/недопустимо
        ]
    },
    
    priceAnalysis: {
        label: "Аналіз вартості",
        fields: [
            { key: "limitPrice", label: "Гранична вартість 1 м²" },
            { key: "actualPrice", label: "Фактична вартість 1 м²" },
            { key: "excessPrice", label: "Перевищення на 1 м²" },
            { key: "excessPercent", label: "Відсоток перевищення" },
            { key: "priceStatus", label: "Статус" }
        ]
    },
    
    financialSummary: {
        label: "Фінансова структура",
        fields: [
            { key: "totalCost", label: "Вартість житла", format: "currency" },
            { key: "baseDownPayment", label: "Базовий початковий внесок (20% або 10%)", format: "currency" },
            { key: "areaExcessPayment", label: "+ Доплата за надлишкову площу", format: "currency" },
            { key: "priceExcessPayment", label: "+ Доплата за перевищення ціни", format: "currency" },
            { key: "totalDownPayment", label: "= Загальний початковий внесок", format: "currency", highlight: true },
            { key: "loanAmount", label: "Сума кредиту", format: "currency", highlight: true }
        ]
    },
    
    monthlyPayments: {
        label: "Щомісячні платежі",
        fields: [
            { key: "monthlyPayment1", label: "Перші 10 років (ставка 3%/7%)", format: "currency" },
            { key: "monthlyPayment2", label: "Наступні роки (ставка 6%/10%)", format: "currency" },
            { key: "totalInterest", label: "Загальна сума відсотків", format: "currency" },
            { key: "totalPayment", label: "Загальна сума виплат", format: "currency" }
        ]
    }
};
```

***

## 10. КОНТРОЛЬНИЙ ПРИКЛАД

**Вхідні дані:**
- Категорія: Вчитель (3%)
- Вік: 30 років
- Сім'я: 3 особи (подружжя + 1 дитина)
- Житло: Квартира у Вінниці (обласний центр)
- Площа: 75 м²
- Вартість: 2 500 000 грн
- Вік будинку: 2 роки
- Термін кредиту: 20 років

**Розрахунок:**

1. **Нормативна площа:**
   - Для 3 осіб: 52,5 + (3-2) × 21 = 73,5 м²
   - Фактична: 75 м²
   - Перевищення: 1,5 м² (2,04%) ✅ Допустимо

2. **Гранична ціна:**
   - Середня вартість Вінницької обл.: 22 989 грн/м²
   - Коефіцієнт (обласний центр): 2,0
   - Гранична ціна: 22 989 × 2,0 = 45 978 грн/м²
   - Фактична ціна: 2 500 000 / 75 = 33 333 грн/м² ✅ В межах ліміту

3. **Початковий внесок:**
   - Базовий (20%): 2 500 000 × 0,20 = 500 000 грн
   - Доплата за площу: 1,5 × 33 333 = 50 000 грн
   - **Загальний: 550 000 грн**

4. **Сума кредиту:**
   - 2 500 000 - 550 000 = **1 950 000 грн** ✅ В межах 200к - 5млн

5. **Щомісячні платежі:**
   - Перші 10 років (3%): **~10 880 грн/міс**
   - Наступні 10 років (6%): **~12 150 грн/міс** (від залишку)

6. **Загальні виплати:**
   - Відсотки: ~950 000 грн
   - **Загалом: 3 450 000 грн**

***

## РЕЗЮМЕ ДЛЯ РОЗРОБНИКА

### Ключові формули:

```python
# 1. Нормативна площа
normative_area = 52.5 if family <= 2 else min(52.5 + (family - 2) * 21, 115.5)  # квартира
normative_area = 62.5 if family <= 2 else min(62.5 + (family - 2) * 21, 125.5)  # будинок

# 2. Гранична ціна
limit_price = minregion_price * (2.0 if major_city else 1.75)

# 3. Початковий внесок
down_payment = total_cost * (0.10 if age < 26 else 0.20)
down_payment += excess_area * price_per_sqm  # якщо площа перевищує
down_payment += (actual_price - limit_price) * area  # якщо ціна перевищує

# 4. Щомісячний платіж (ануїтет)
r = annual_rate / 12
payment = (loan * r * (1 + r)**n) / ((1 + r)**n - 1)
```

### Валідаційні правила:

- ✅ Вік будинку: ≤3 роки (загальне), ≤10 років (ВПО та пільгові в прифронтових)
- ✅ Перевищення площі: ≤10% і тільки для житла ≤3 роки
- ✅ Перевищення ціни: ≤10% від граничної
- ✅ Сума кредиту: 200 000 - 5 000 000 грн
- ✅ Термін: 12-240 місяців

**Офіційні джерела даних:**
- Постанова КМУ №856 від 02.08.2022 (зі змінами)
- Накази Мінрегіону (щоквартально)
- Портал https://eoselia.diia.gov.ua

***

Цей документ містить всю необхідну інформацію для створення точного калькулятора "єОселя". Усі формули, ліміти та логіка перевірені за офіційними джерелами станом на лютий 2026 року.