## [3.1.2](https://github.com/dhis2/prop-types/compare/v3.1.1...v3.1.2) (2022-05-24)


### Bug Fixes

* **deprecated:** show warning only if prop is populated ([#289](https://github.com/dhis2/prop-types/issues/289)) ([1417bda](https://github.com/dhis2/prop-types/commit/1417bdafb43e586e4c7422c1f3ca26fc9928e88f))

## [3.1.1](https://github.com/dhis2/prop-types/compare/v3.1.0...v3.1.1) (2022-05-24)


### Bug Fixes

* expose new deprecated function ([#288](https://github.com/dhis2/prop-types/issues/288)) ([7240f14](https://github.com/dhis2/prop-types/commit/7240f147797f6dae93a68a86416c48c30986dc27))

# [3.1.0](https://github.com/dhis2/prop-types/compare/v3.0.0...v3.1.0) (2022-05-24)


### Features

* add deprecated prop decorator ([#286](https://github.com/dhis2/prop-types/issues/286)) ([cdeea37](https://github.com/dhis2/prop-types/commit/cdeea3787de1e9d145a71ed9a1875a58c09cee9c))

# [3.0.0](https://github.com/dhis2/prop-types/compare/v2.0.4...v3.0.0) (2021-09-30)


### Bug Fixes

* publish codemod and add migration docs ([#260](https://github.com/dhis2/prop-types/issues/260)) ([7a0fc61](https://github.com/dhis2/prop-types/commit/7a0fc61b4970aef01537b93861b0c0bc969bdfca))


### Code Refactoring

* only export custom prop-type functions ([#254](https://github.com/dhis2/prop-types/issues/254)) ([c2262e0](https://github.com/dhis2/prop-types/commit/c2262e0503e78f4b2e1bb65ba5114821c606bd2d))


### BREAKING CHANGES

* prop-types from the `props-types` package are no longer re-exported from `@dhis2/prop-types`
* `@dhis2/prop-types` no longer exports a default, the DHIS2 custom prop-types are only available as named imports

# [3.0.0-beta.2](https://github.com/dhis2/prop-types/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2021-09-29)


### Bug Fixes

* publish codemod and add migration docs ([#260](https://github.com/dhis2/prop-types/issues/260)) ([7a0fc61](https://github.com/dhis2/prop-types/commit/7a0fc61b4970aef01537b93861b0c0bc969bdfca))

# [3.0.0-beta.1](https://github.com/dhis2/prop-types/compare/v2.0.4...v3.0.0-beta.1) (2021-09-19)


### Code Refactoring

* only export custom prop-type functions ([#254](https://github.com/dhis2/prop-types/issues/254)) ([c2262e0](https://github.com/dhis2/prop-types/commit/c2262e0503e78f4b2e1bb65ba5114821c606bd2d))


### BREAKING CHANGES

* prop-types from the `props-types` package are no longer re-exported from `@dhis2/prop-types`
* `@dhis2/prop-types` no longer exports a default, the DHIS2 custom prop-types are only available as named imports

## [2.0.4](https://github.com/dhis2/prop-types/compare/v2.0.3...v2.0.4) (2021-09-09)


### Bug Fixes

* **required-if:** mention condition in error message ([e9f40cd](https://github.com/dhis2/prop-types/commit/e9f40cd6665f198791bfdf31e50a631b0671f096))

## [2.0.3](https://github.com/dhis2/prop-types/compare/v2.0.2...v2.0.3) (2020-12-04)


### Bug Fixes

* remove unnecessary react peerDependency ([#213](https://github.com/dhis2/prop-types/issues/213)) ([9c761c7](https://github.com/dhis2/prop-types/commit/9c761c784729c6d1f7dcb0c77f03c7c5e665142d))

## [2.0.2](https://github.com/dhis2/prop-types/compare/v2.0.1...v2.0.2) (2020-11-02)


### Bug Fixes

* cut release ([2b9cfb1](https://github.com/dhis2/prop-types/commit/2b9cfb15cf69d0a529a63293aead72716c60f9da))

## [2.0.1](https://github.com/dhis2/prop-types/compare/v2.0.0...v2.0.1) (2020-10-27)


### Bug Fixes

* build with platform d2-app-scripts ([#144](https://github.com/dhis2/prop-types/issues/144)) ([018c0ed](https://github.com/dhis2/prop-types/commit/018c0ed1d6d89b9bfb24a86f74e2f7f3d212f301))

# [2.0.0](https://github.com/dhis2/prop-types/compare/v1.6.4...v2.0.0) (2020-04-28)


### Features

* update the export style ([decd522](https://github.com/dhis2/prop-types/commit/decd5227cdc3f7ccce1571ded890f636bd984332))


### BREAKING CHANGES

* this changes the re-export style for the prop-types lib. Instead of mixing our custom and the upstream prop-types, now the upstream lib is namespaced under the 'PropTypes' named export.

## [1.6.4](https://github.com/dhis2/prop-types/compare/v1.6.3...v1.6.4) (2020-04-02)


### Bug Fixes

* export named exports as well ([4030de5](https://github.com/dhis2/prop-types/commit/4030de5d75845e354ba7d4f04288d6880c0551bd))

## [1.6.3](https://github.com/dhis2/prop-types/compare/v1.6.2...v1.6.3) (2020-04-02)


### Bug Fixes

* move all prop-types to default export ([08eb729](https://github.com/dhis2/prop-types/commit/08eb72964a42bea5385aeaa9d6b76f4b55e5be24))

## [1.6.2](https://github.com/dhis2/prop-types/compare/v1.6.1...v1.6.2) (2020-04-01)


### Bug Fixes

* **conditional:** correct typo in assignment in index.js ([d6c54f6](https://github.com/dhis2/prop-types/commit/d6c54f6eff9875f578d4d9f43608a09041d067d9))

## [1.6.1](https://github.com/dhis2/prop-types/compare/v1.6.0...v1.6.1) (2020-03-31)


### Bug Fixes

* **conditional:** expose prop type publicly ([9439a60](https://github.com/dhis2/prop-types/commit/9439a60cfe2ab6493848e548d46045b0f6cca8c7))

# [1.6.0](https://github.com/dhis2/prop-types/compare/v1.5.0...v1.6.0) (2020-03-27)


### Features

* add conditional propType ([e859fff](https://github.com/dhis2/prop-types/commit/e859fff2a3f0ef2470c1f4d8e2b70da7e3caa760))

# [1.5.0](https://github.com/dhis2/prop-types/compare/v1.4.0...v1.5.0) (2019-12-04)


### Bug Fixes

* **array with length:** check prop type correctly & fix error message ([c465743](https://github.com/dhis2/prop-types/commit/c465743b535223549151b35560f7975b222edaaf))
* **required if:** remove duplicate prop name from error message ([f9f44b0](https://github.com/dhis2/prop-types/commit/f9f44b067d354a10fe28b89563cb0155cce649cc))


### Features

* **instance of component:** display name instead of the function body ([ede4312](https://github.com/dhis2/prop-types/commit/ede43124f83b10dd3d28e264ccbf7839a83fcad8))

# [1.4.0](https://github.com/dhis2/prop-types/compare/v1.3.0...v1.4.0) (2019-11-21)


### Features

* **index js:** add requiredIf to named exports ([#75](https://github.com/dhis2/prop-types/issues/75)) ([cf6697e](https://github.com/dhis2/prop-types/commit/cf6697e6a213b76c8c047355149681339c2d92a5))

# [1.3.0](https://github.com/dhis2/prop-types/compare/v1.2.2...v1.3.0) (2019-11-07)


### Features

* introduce requiredIf ([#73](https://github.com/dhis2/prop-types/issues/73)) ([b372d1b](https://github.com/dhis2/prop-types/commit/b372d1b87ac03f2eee9964274157e19985cb6928))

## [1.2.2](https://github.com/dhis2/prop-types/compare/v1.2.1...v1.2.2) (2019-11-05)


### Bug Fixes

* remove object rest/spread syntax because this breaks Edge ([#65](https://github.com/dhis2/prop-types/issues/65)) ([b84e654](https://github.com/dhis2/prop-types/commit/b84e6547f8d6f69619edb915be75ad2160ee8ffd))

## [1.2.1](https://github.com/dhis2/prop-types/compare/v1.2.0...v1.2.1) (2019-10-14)


### Bug Fixes

* improve instanceOfComponent robustness and remove incorrect logic ([#60](https://github.com/dhis2/prop-types/issues/60)) ([7273d7b](https://github.com/dhis2/prop-types/commit/7273d7ba535ebde0931f36e3f9f276ebb60ccc2a))

# [1.2.0](https://github.com/dhis2/prop-types/compare/v1.1.1...v1.2.0) (2019-10-07)


### Features

* messages and instanceOfComponent when wrapped in `arrayOf` ([#56](https://github.com/dhis2/prop-types/issues/56)) ([e7a2355](https://github.com/dhis2/prop-types/commit/e7a2355))

## [1.1.1](https://github.com/dhis2/prop-types/compare/v1.1.0...v1.1.1) (2019-09-24)


### Bug Fixes

* **docs:** build docs on pre-commit ([#51](https://github.com/dhis2/prop-types/issues/51)) ([a9a0491](https://github.com/dhis2/prop-types/commit/a9a0491))

# [1.1.0](https://github.com/dhis2/prop-types/compare/v1.0.4...v1.1.0) (2019-09-11)


### Features

* add custom prop types to propTypes object ([#39](https://github.com/dhis2/prop-types/issues/39)) ([e23ffb7](https://github.com/dhis2/prop-types/commit/e23ffb7))

## [1.0.4](https://github.com/dhis2/prop-types/compare/v1.0.3...v1.0.4) (2019-08-25)


### Bug Fixes

* add react as a peer dependency ([#33](https://github.com/dhis2/prop-types/issues/33)) ([88cb383](https://github.com/dhis2/prop-types/commit/88cb383))

## [1.0.3](https://github.com/dhis2/prop-types/compare/v1.0.2...v1.0.3) (2019-07-29)


### Bug Fixes

* build cjs module correctly ([#31](https://github.com/dhis2/prop-types/issues/31)) ([2dc51da](https://github.com/dhis2/prop-types/commit/2dc51da))

## [1.0.2](https://github.com/dhis2/prop-types/compare/v1.0.1...v1.0.2) (2019-07-17)


### Bug Fixes

* un-ignore the build folder for publishing ([#22](https://github.com/dhis2/prop-types/issues/22)) ([bd839b8](https://github.com/dhis2/prop-types/commit/bd839b8))

## [1.0.1](https://github.com/dhis2/prop-types/compare/v1.0.0...v1.0.1) (2019-07-15)


### Bug Fixes

* update the publish configuration ([6c5a584](https://github.com/dhis2/prop-types/commit/6c5a584))

# 1.0.0 (2019-07-15)


### chore

* 1.0.0 of prop-types ([#20](https://github.com/dhis2/prop-types/issues/20)) ([c922cf4](https://github.com/dhis2/prop-types/commit/c922cf4))


### Features

* add array with length prop type validator ([61bcf81](https://github.com/dhis2/prop-types/commit/61bcf81))


### BREAKING CHANGES

* Release 1.0.0 of @dhis2/prop-types
