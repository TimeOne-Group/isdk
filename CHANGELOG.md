# ISDK Changelog


### [2.6.2](https://github.com/TimeOne-Group/isdk/compare/2.6.1...2.6.2) (2023-12-04)


### Bug Fixes

* passe uniquement queryparams subids au log hit ([aa9a24c](https://github.com/TimeOne-Group/isdk/commit/aa9a24c51804cd138c6675a874dfccfd493aa726))

### [2.6.1](https://github.com/TimeOne-Group/isdk/compare/2.6.0...2.6.1) (2023-11-16)


### Bug Fixes

* permet log fingerprint cashback ([59f12ef](https://github.com/TimeOne-Group/isdk/commit/59f12ef4e10d2062d0444efa9ce1c7567ce7fa15))

## [2.6.0](https://github.com/TimeOne-Group/isdk/compare/2.5.0...2.6.0) (2023-11-07)


### Features

* ajoute un log a chaque hit ([02d3fba](https://github.com/TimeOne-Group/isdk/commit/02d3fbaf168da5994cce3c16c1052a57313588a9))

## [2.5.0](https://github.com/TimeOne-Group/isdk/compare/2.4.0...2.5.0) (2023-10-24)


### Features

* ajoute un log a chaque visite ([5853688](https://github.com/TimeOne-Group/isdk/commit/58536881b028488ca420e81108f17c1cb4c61127))

## [2.4.0](https://github.com/TimeOne-Group/isdk/compare/2.3.3...2.4.0) (2023-04-19)


### Features

* envoie un log lorsque optin pour stocker ip et fingerprint ([59909be](https://github.com/TimeOne-Group/isdk/commit/59909be63b32fe3a596a36eefdc847cd7d779d74))
* permet une conversion sans subid ([e00d4ff](https://github.com/TimeOne-Group/isdk/commit/e00d4ff98a686ecac3e953273199228030204951))
* supprime data sur server lorque optout ([a5b31f2](https://github.com/TimeOne-Group/isdk/commit/a5b31f22de65942e38502232c1f75e3834d558ec))

### [2.3.3](https://github.com/TimeOne-Group/isdk/compare/2.3.2...2.3.3) (2023-04-19)

### [2.3.2](https://github.com/TimeOne-Group/isdk/compare/2.3.1...2.3.2) (2023-04-03)


### Bug Fixes

* **domain wildcard:** active le cookie wildcard avec un bool ([46717ba](https://github.com/TimeOne-Group/isdk/commit/46717ba813f7fb5fe5cf857df1783c7013a00129))

### [2.3.1](https://github.com/TimeOne-Group/isdk/compare/2.3.0...2.3.1) (2023-04-03)


### Bug Fixes

* empeche ecriture de cookie vide si pas de subids a initialisation ([4e97ad5](https://github.com/TimeOne-Group/isdk/commit/4e97ad577ecc8155e8c919dbfebfe4b80690abe5))
* permet eviter multi injection sdk ([8484a69](https://github.com/TimeOne-Group/isdk/commit/8484a692eaf0d3e347ab1b395116d75e8688b2f2))

## [2.3.0](https://github.com/TimeOne-Group/isdk/compare/2.2.1...2.3.0) (2023-03-28)


### Features

* ajout optionnel du comid du la method addConversion ([e5a5711](https://github.com/TimeOne-Group/isdk/commit/e5a5711fb3b1558ffd3b7a11b0905b3b92286781))

### [2.2.1](https://github.com/TimeOne-Group/isdk/compare/2.2.0...2.2.1) (2023-03-13)


### Bug Fixes

* ajoute tests pour le support cookie wildcard ([d69416d](https://github.com/TimeOne-Group/isdk/commit/d69416d934c7efe747fe256ac22221b8c917666c))

## [2.2.0](https://github.com/TimeOne-Group/isdk/compare/2.1.3...2.2.0) (2023-03-08)


### Features

* ajoute option cookie wildcard ([dfc3f9e](https://github.com/TimeOne-Group/isdk/commit/dfc3f9e0ec103c86d028bdf2b9aec8aa90856011))

### [2.1.3](https://github.com/TimeOne-Group/isdk/compare/2.1.2...2.1.3) (2023-01-23)


### Bug Fixes

* **ci:** corrige var env cdn cache ([146924e](https://github.com/TimeOne-Group/isdk/commit/146924e51527f571bf8eb2ea1d8ea9abb2c90add))

### [2.1.2](https://github.com/TimeOne-Group/isdk/compare/2.1.1...2.1.2) (2023-01-23)


### Bug Fixes

* **ci:** purge tous les assets ([85b70e2](https://github.com/TimeOne-Group/isdk/commit/85b70e24b60bd22cbb4e48d410abd05967eec44d))

### [2.1.1](https://github.com/TimeOne-Group/isdk/compare/2.1.0...2.1.1) (2023-01-23)


### Bug Fixes

* **log:** ajoute url dans log addConversion ([9901bdb](https://github.com/TimeOne-Group/isdk/commit/9901bdbceb6162b8e33579c0417f38a5a4a62faa))

## [2.1.0](https://github.com/TimeOne-Group/isdk/compare/2.0.1...2.1.0) (2022-12-16)


### Bug Fixes

* active envoie url dans stats ([0f675b3](https://github.com/TimeOne-Group/isdk/commit/0f675b3ce9eba4cb1bca3a919dead13d6d098aa6))

### [2.0.1](https://github.com/TimeOne-Group/isdk/compare/2.0.0...2.0.1) (2022-10-28)


### Bug Fixes

* **retrocompatibility:** supprime ancien localstorage avant appliquer retrocompatibilite ([bdd5e49](https://github.com/TimeOne-Group/isdk/commit/bdd5e499ea4dce4842a8428a12b56c765edf3d81))

## [2.0.0](https://github.com/TimeOne-Group/isdk/compare/1.1.4...2.0.0) (2022-10-27)


### Features

* permet le stockage de plusieurs subids ([de4a903](https://github.com/TimeOne-Group/isdk/commit/de4a9038ed13719db3246ba20e70f0d8b264c514))
* permet retrocompatibilité ([a9fa925](https://github.com/TimeOne-Group/isdk/commit/a9fa925096b07b7eedbde62cbf05a57d22929e56))


### Bug Fixes

* remonte url dans les stats consent et conversion ([f18d1f8](https://github.com/TimeOne-Group/isdk/commit/f18d1f83a6e9729f1c603b537ad8adc698d920c5))

### [1.1.4](https://github.com/TimeOne-Group/isdk/compare/1.1.3...1.1.4) (2022-08-02)


### Bug Fixes

* récupére progid depuis gtm sandbox ([68c88e9](https://github.com/TimeOne-Group/isdk/commit/68c88e90dc13de034f4c90f8a7aea3ee66931204))

### [1.1.3](https://github.com/TimeOne-Group/isdk/compare/1.1.2...1.1.3) (2022-07-29)

### [1.1.2](https://github.com/TimeOne-Group/isdk/compare/1.1.1...1.1.2) (2022-07-26)


### Bug Fixes

* **readme:** corrige typo ([9bbbb4f](https://github.com/TimeOne-Group/isdk/commit/9bbbb4f1e2442bc4e89c05414c19fc4ad28996bb))

### [1.1.1](https://github.com/TimeOne-Group/isdk/compare/1.1.0...1.1.1) (2022-07-25)


### Bug Fixes

* **assets:** génére le build de prod ([dedc281](https://github.com/TimeOne-Group/isdk/commit/dedc281852edb76c404d4fd587509c6998e035bc))

## [1.1.0](https://github.com/TimeOne-Group/isdk/compare/1.0.1...1.1.0) (2022-07-05)


### Features

* ajoute methode addConversion ([84fe828](https://github.com/TimeOne-Group/isdk/commit/84fe828333748a6ede33581fc0da6b352ddea509))
* gere la preuve de consentement ([22a74b0](https://github.com/TimeOne-Group/isdk/commit/22a74b09fa13c896f94a0f7221efee345cebf49e))
* remonte les stats de consentement ([6f4b167](https://github.com/TimeOne-Group/isdk/commit/6f4b167c05490390a0f15a7e58aa82ef20fd42ba))

### [1.0.1](https://github.com/TimeOne-Group/isdk/compare/1.0.0...1.0.1) (2022-06-14)


### Bug Fixes

* update le README ([02d2b12](https://github.com/TimeOne-Group/isdk/commit/02d2b12fae0a48ae411f0ef602ca40b397a73389))

## 1.0.0 (2022-06-07)


### Features

* **cashback:** gere les conversions cashback ([b24e632](https://github.com/TimeOne-Group/isdk/commit/b24e632b4f5df45c3b0523776bf5189c39bb94f5))
* gére les progids ([032cdd3](https://github.com/TimeOne-Group/isdk/commit/032cdd3ee02801dec2c6c574eae2d44f892cba02))
* initialise la conversion ([8c3aa57](https://github.com/TimeOne-Group/isdk/commit/8c3aa57e571a1aea8e71d005fbb503b1660f9d7f))
* initialise le repo ([c82c48c](https://github.com/TimeOne-Group/isdk/commit/c82c48c9d815bbb3d9bbd0c899465bfbecc8c404))
* initialise le sdk ([153de75](https://github.com/TimeOne-Group/isdk/commit/153de75924e5b17422991e7836dbf9acafd58a3e))


### Bug Fixes

* corrige en de production ([2e1ca82](https://github.com/TimeOne-Group/isdk/commit/2e1ca8232a2347721fc2cef70d5db578aeae70c1))
