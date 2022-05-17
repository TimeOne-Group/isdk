# Privacy By Design

[![GitHub Super-Linter](https://github.com/TimeOne-Group/isdk/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
[![GitHub Super-Linter](https://github.com/TimeOne-Group/isdk/workflows/Test%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)

## Demo

https://timeone-group.github.io/isdk/

## CDN

https://cdn.jsdelivr.net/gh/TimeOne-Group/isdk@main/dist/isdk.min.js

## Test

### Unit

```bash
cp .env .env.test
```

### Browserstack

```bash
cp .env .env.test
```

Dans le `.env.test` assigner les valeurs des variables d'environnement `BROWSERSTACK_USERNAME` et `BROWSERSTACK_ACCESS_KEY` avec les valeurs de votre compte browserstack. Elles sont disponibles sur https://automate.browserstack.com/dashboard/v2 en cliquant sur le bouton `ACCESS KEY`.
Ajouter également la variable env `DEV_BROWSERSTACK_TEST` à `true` pour que les tests sur browserstack soient lancés sur un seul environnement:

- Windows 10 - Chrome latest

```bash
docker-compose --env-file ./.env.test up browserstack_test
```

### Debug local sur browserstack

```bash
 ./BrowserStackLocal --key 5FxxnV4y9CkrLwxDokpG
```

https://live.browserstack.com/dashboard
