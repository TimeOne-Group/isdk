# Contributing to ISDK

To get started:

```sh
$ git clone https://github.com/TimeOne-Group/isdk.git && cd isdk
$ docker compose run --rm build npm ci
```

## Structure

The [source](https://github.com/TimeOne-Group/isdk/tree/main) is split up into a few categories:

- [src](https://github.com/TimeOne-Group/isdk/tree/main/src): sdk source code.
- [browserstack_src](https://github.com/TimeOne-Group/isdk/tree/main/browserstack_src): browserstack test site source code.
- [browserstack](https://github.com/TimeOne-Group/isdk/tree/main/browserstack): browserstack tests.

## npm scripts

### Run Unit Tests

```sh
$ docker compose run --rm test

# watch for changes
$ docker compose run --rm test npm run test:unit:watch
```

### Run Browserstack Tests

```sh
$ cp .env .env.browserstack
```

In the `.env.browserstack` the variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` can be filled with a browserstack account on https://automate.browserstack.com/dashboard/v2 by clicking on `ACCESS KEY`.
Setting up `DEV_BROWSERSTACK_TEST` to `true` allow to run browserstack tests on only one environment:

- Windows 10 - Chrome latest

```sh
$ docker compose --env-file ./.env.browserstack run --rm browserstack_test
```

### Update Browserstack capabilities snapshot

Mobile devices configured in `browserstack/capabilities.mjs` are validated against the BrowserStack catalogue at runtime (unavailable devices are skipped with a warning). To browse the full catalogue locally, e.g. to pick new devices:

```sh
$ docker compose --env-file ./.env.browserstack run --rm browserstack_test npm run capabilities:update
```

This regenerates `browserstack/capabilities.json` (git-ignored) from the [browsers.json API](https://api.browserstack.com/automate/browsers.json).

### Linting

```sh
$ docker compose run --rm test npm run lint
```

Happy coding!
