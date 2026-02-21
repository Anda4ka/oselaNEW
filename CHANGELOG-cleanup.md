# Очистка неиспользуемого кода

**Дата:** 2026-02-06

---

## Что было сделано

Проведён аудит всего проекта на наличие неиспользуемого кода: TODO-комментариев, мёртвых импортов, неиспользуемых переменных, CSS-классов и конфигураций.

---

## Исправление 1: Удалён файл `i18n.ts`

**Файл:** `i18n.ts` (корень проекта)

**Проблема:** Файл `i18n.ts` дублировал функциональность `i18n.config.js`. При этом `next.config.js` подключает именно `i18n.config.js`:

```js
// next.config.js, строка 3
const withNextIntl = createNextIntlPlugin('./i18n.config.js');
```

Файл `i18n.ts` не импортировался ни одним файлом в проекте — его экспорты (`locales`, `Locale`, `getRequestConfig`) нигде не использовались.

**Действие:** Файл удалён полностью.

---

## Исправление 2: Очищен `app/globals.css`

**Файл:** `app/globals.css`

**Проблема:** Файл содержал CSS-переменные и утилитарный класс, которые нигде в проекте не использовались:

- `:root` с переменными `--foreground-rgb`, `--background-start-rgb`, `--background-end-rgb`
- `@media (prefers-color-scheme: dark)` блок с теми же переменными
- `.text-balance` утилитарный класс в `@layer utilities`

Ни одна из этих переменных и классов не была найдена ни в одном компоненте, шаблоне или другом CSS-файле.

**Было:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

**Стало:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Исправление 3: Удалена палитра `secondary` из `tailwind.config.ts`

**Файл:** `tailwind.config.ts`

**Проблема:** В конфигурации Tailwind была определена палитра цветов `secondary` (зелёные оттенки от 50 до 900), но ни один компонент в проекте не использовал классы `secondary-*`. Используется только палитра `primary`.

**Удалённый блок:**
```ts
secondary: {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
},
```

**Палитра `primary` оставлена без изменений** — она активно используется в компонентах.

---

## Что НЕ было затронуто

- `i18n.config.js` — активно используется в `next.config.js`, оставлен как есть
- Все компоненты, API-роуты, middleware — без изменений
- Палитра `primary` в `tailwind.config.ts` — оставлена
- Файлы локализации (`locales/*.json`) — без изменений
- Prisma-схема и seed — без изменений

---

## Проверка

- `npm run build` — билд проходит успешно, ошибок нет
- `npm run dev` — сайт загружается и работает корректно
- Стили отображаются без изменений (удалённый код не влиял на внешний вид)
