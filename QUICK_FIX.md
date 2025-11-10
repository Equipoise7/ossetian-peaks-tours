# Быстрое исправление ошибок 404 для ресурсов

## Проблема
Ошибки типа:
```
GET https://equipoise7.github.io/assets/index-xxx.js net::ERR_ABORTED 404
GET https://equipoise7.github.io/assets/index-xxx.css net::ERR_ABORTED 404
```

## Решение

### ✅ Что уже исправлено:
1. ✅ Добавлен `base` path в `vite.config.ts`
2. ✅ Добавлен `basename` в `BrowserRouter` для синхронизации с Vite
3. ✅ Настроена автоматическая синхронизация base path между Vite и React Router

### Шаг 1: Определите правильный URL вашего сайта

Проверьте в настройках GitHub репозитория:
1. Зайдите в **Settings** → **Pages**
2. Посмотрите на **"Your site is published at:"**
3. Запомните этот URL

**Важно:** Если URL содержит имя репозитория (например, `/ossetian-peaks-tours/`), это подпапка. Если URL просто `username.github.io`, это корень.

### Шаг 2: Настройте base path

Откройте файл `vite.config.ts` и найдите строку:
```typescript
const basePath = process.env.VITE_BASE_PATH || '/ossetian-peaks-tours/';
```

**Если ваш сайт доступен по адресу:**
- `https://equipoise7.github.io/ossetian-peaks-tours/` → оставьте: `'/ossetian-peaks-tours/'`
- `https://equipoise7.github.io/` (без подпапки) → измените на: `'/'`

### Шаг 3: Пересоберите и задеплойте

```bash
# Задеплойте изменения
git add .
git commit -m "Fix base path configuration"
git push
```

GitHub Actions автоматически пересоберет и задеплоит проект с правильными путями.

### Шаг 4: Проверьте

1. Подождите, пока GitHub Actions завершит деплой (2-3 минуты)
2. Откройте сайт в браузере
3. Откройте консоль разработчика (F12)
4. Убедитесь, что нет ошибок 404 для ресурсов (JS/CSS файлов)
5. Проверьте, что пути к ресурсам правильные (должны начинаться с вашего base path)

## Альтернатива: Использование переменной окружения

Если вы хотите изменить base path без изменения кода, добавьте в `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: '/'  # или '/ossetian-peaks-tours/'
```

## Важно

- После изменения base path нужно **обязательно пересобрать проект** (`npm run build`)
- React Router теперь автоматически синхронизирован с base path через `import.meta.env.BASE_URL`
- Если ошибки 404 продолжаются, проверьте, что base path в `vite.config.ts` соответствует реальному URL вашего сайта

