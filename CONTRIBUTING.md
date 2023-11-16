# Contributing to ISDK

To get started:

```sh
$ git clone https://github.com/TimeOne-Group/isdk.git && cd isdk
$ docker compose run build npm ci
```

## Structure

The [source](https://github.com/TimeOne-Group/isdk/tree/main) is split up into a few categories:

- [src](https://github.com/TimeOne-Group/isdk/tree/main/src): sdk source code.
- [browserstack_src](https://github.com/TimeOne-Group/isdk/tree/main/browserstack_src): browserstack test site source code.
- [browserstack](https://github.com/TimeOne-Group/isdk/tree/main/browserstack): browserstack tests.

## npm scripts

### Run Unit Tests

```sh
$ docker compose run test

# watch for changes
$  docker compose run test npm run test:unit:watch
```

### Run Browserstack Tests

```sh
$ cp .env .env.browserstack
```

In the `.env.browserstack` the variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` can be filled with a browserstack account on https://automate.browserstack.com/dashboard/v2 by clicking on `ACCESS KEY`.
Setting up `DEV_BROWSERSTACK_TEST` to `true` allow to run browserstack tests on only one environment:

- Windows 10 - Chrome latest

```sh
$ docker compose --env-file ./.env.browserstack run browserstack_test
```

### Linting

```sh
$ docker compose run test npm run lint
```

Happy coding!
