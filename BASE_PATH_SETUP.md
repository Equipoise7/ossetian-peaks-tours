# Настройка Base Path для GitHub Pages

## Проблема с 404 ошибками для ресурсов

Если вы видите ошибки типа:
```
GET https://equipoise7.github.io/assets/index-xxx.js net::ERR_ABORTED 404 (Not Found)
```

Это означает, что `base` path в `vite.config.ts` настроен неправильно.

## Как определить правильный base path?

### Вариант 1: Сайт в корне (username.github.io)

Если ваш сайт доступен по адресу:
- `https://equipoise7.github.io/`

То в `vite.config.ts` должно быть:
```typescript
const basePath = '/';
```

### Вариант 2: Сайт в подпапке проекта

Если ваш сайт доступен по адресу:
- `https://equipoise7.github.io/ossetian-peaks-tours/`

То в `vite.config.ts` должно быть:
```typescript
const basePath = '/ossetian-peaks-tours/';
```

## Как исправить?

1. Откройте файл `vite.config.ts`

2. Найдите строку:
```typescript
const basePath = process.env.VITE_BASE_PATH || '/';
```

3. Измените на нужное значение:
   - Для корня: `const basePath = '/';`
   - Для подпапки: `const basePath = '/ossetian-peaks-tours/';`

4. Или установите через переменную окружения в GitHub Actions:
   - Добавьте в `.github/workflows/deploy.yml`:
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_BASE_PATH: '/ossetian-peaks-tours/'
   ```

5. Пересоберите и задеплойте проект:
```bash
npm run build
git add .
git commit -m "Fix base path"
git push
```

## Проверка

После деплоя проверьте:
1. Откройте сайт в браузере
2. Откройте консоль разработчика (F12)
3. Проверьте, что нет ошибок 404 для ресурсов (JS/CSS файлов)
4. Проверьте, что пути к ресурсам правильные (должны начинаться с вашего base path)

## Как узнать, какой URL использует ваш сайт?

1. Зайдите в настройки репозитория на GitHub
2. Перейдите в Settings → Pages
3. Посмотрите на "Your site is published at:" - это ваш URL
4. Если URL содержит имя репозитория (например, `/ossetian-peaks-tours/`), используйте этот путь как base
5. Если URL просто `username.github.io`, используйте `/` как base

