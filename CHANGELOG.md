#### 0.13.0 (2021-09-30)

##### Breaking Changes

*  Removed deprecated Selector component STC-533 ([#149](https://github.com/micromed-dev/herz-ui/pull/149)) ([d5de5128](https://github.com/micromed-dev/herz-ui/commit/d5de5128cf099d75cdf33730dc4184786046ec9b))

##### New Features

* **Avatar:**  Added new Avatar component STC-481 ([#148](https://github.com/micromed-dev/herz-ui/pull/148)) ([6f3a9253](https://github.com/micromed-dev/herz-ui/commit/6f3a9253bd9b5aeb444ff2826bc28600988bca17))

#### 0.12.0 (2021-09-28)

##### Breaking Changes

*  moved theme-ui to peerDependencies STC-403 ([#146](https://github.com/micromed-dev/herz-ui/pull/146)) ([8835b60f](https://github.com/micromed-dev/herz-ui/commit/8835b60f5c03a1d6a7e0dd67d6d8372d7335acef))

#### 0.10.1 (2021-09-01)

##### Chores

* **Typography:**  Added story ([abd3184a](https://github.com/micromed-dev/herz-ui/commit/abd3184a74a0b4a86bdbefc409809d82e807167c))

##### Bug Fixes

*  Fixed input height 0 ([54630a5d](https://github.com/micromed-dev/herz-ui/commit/54630a5da07f7ea4740893e19cc1bbbda49f04bb))

##### Other Changes

*  reworked snapshots save path ([8bc088b9](https://github.com/micromed-dev/herz-ui/commit/8bc088b9c1605461beeb09ea326aaac5d8e34060))

##### Refactors

*  colocate storyshots with component files ([5d218837](https://github.com/micromed-dev/herz-ui/commit/5d2188371fc76239d91e2c71b2fddbaae3d628c2))

#### 0.10.0 (2021-07-29)

##### Chores

*  New building process with rollup STC-358 ([#139](https://github.com/micromed-dev/herz-ui/pull/139)) ([84dc2551](https://github.com/micromed-dev/herz-ui/commit/84dc255145c06a223d4c831afdbc75cd20568960))
*  Removed old snapshots STC-352 ([31386bfd](https://github.com/micromed-dev/herz-ui/commit/31386bfd37d684e9b7e4d3ace858a0a650f7f102))
* **Switch:**
  *  changed default color STC-352 ([017b336e](https://github.com/micromed-dev/herz-ui/commit/017b336ec2f027ca1b4194e6ffe98e1c28d2c0e9))
  *  Updated tests, added docs STC-352 ([fbcdbdde](https://github.com/micromed-dev/herz-ui/commit/fbcdbdde47be30ffd885d9f69f3087df99a122de))

##### New Features

* **Switch:**  Added Switch STC-352 ([f6ce143d](https://github.com/micromed-dev/herz-ui/commit/f6ce143d4e8454347f6ce8699ca8038dbf2374c7))

#### 0.9.6 (2021-07-21)

##### New Features

* **Uploader:**  Added showFiles option minor layout fixes STC-306 ([ec4fad2a](https://github.com/micromed-dev/herz-ui/commit/ec4fad2ab24c789af5f24c8369283caff4356a26))

##### Bug Fixes

* **Alert:**  Minor fixes STC-306 ([2a658129](https://github.com/micromed-dev/herz-ui/commit/2a658129e0003a2df1f3d422186ca0a908402c50))

##### Tests

* **Uploader:**  Fixed tests STC-306 ([69408dad](https://github.com/micromed-dev/herz-ui/commit/69408dad5d1fd79915fa554f7eecca78946cc849))

#### 0.9.5 (2021-07-19)

##### Bug Fixes

* **SubNavigationMenu:**  Updated unselected color ([4b6df262](https://github.com/micromed-dev/herz-ui/commit/4b6df262b01e2b90fb428d6ae6467cd6d8a88c7c))
* **SubNavitationMenu:**  Minor fixes, added export STC-306 ([7eccd29e](https://github.com/micromed-dev/herz-ui/commit/7eccd29ec16c05d599c387145c8bd03365fb0a11))

#### 0.9.4 (2021-07-13)

##### Bug Fixes

* **ListSelect:**  Added missing export ([1b5a9e8c](https://github.com/micromed-dev/herz-ui/commit/1b5a9e8cad5a223cf7a7026ba3c3242fb5695b66))
* **Editable:**  Fixed Editable Select blur bug ([d935c8fd](https://github.com/micromed-dev/herz-ui/commit/d935c8fd69b65ceade10a7fa7cad816a18e1840f))

#### 0.9.3 (2021-07-09)

##### Bug Fixes

*  add missing exports ([7dd00c88](https://github.com/micromed-dev/herz-ui/commit/7dd00c8852bbbc7ccf6211ed644c69d7d10aec25))

#### 0.9.2 (2021-07-09)

##### Chores

*  Added vite builder to storybook, added ESM build ([d3f9381e](https://github.com/micromed-dev/herz-ui/commit/d3f9381e44eea2b3b439ea600f53635c2d744283))

##### Bug Fixes

*  Fixed ssr error on Select and Autocomplete ([c3b1268f](https://github.com/micromed-dev/herz-ui/commit/c3b1268f11cdd5df4da5d311cd79cb398b180c78))
*  Fix storybook error ([64b5b765](https://github.com/micromed-dev/herz-ui/commit/64b5b765bca76de0c57022817e8d856094602556))
* **Autocomplete:**
  *  Fixed enter closing menu on multi DEV-296 ([4272f489](https://github.com/micromed-dev/herz-ui/commit/4272f489228928d8dd1d1761817a78f6dda88901))
  *  Fix arrow navigation not working ([f1016797](https://github.com/micromed-dev/herz-ui/commit/f10167977c3bae78a1695b75b523c0aad2d29492))
* **Popover:**
  *  Fixed appendTo prop DEV-296 ([0e348b1b](https://github.com/micromed-dev/herz-ui/commit/0e348b1b6a95a0225c18e19f76fb26ec2ee0c75a))
  *  Fixed popover clipping on rare cases DEV-288 ([cefc85b3](https://github.com/micromed-dev/herz-ui/commit/cefc85b38d9ee35bd4ff1b205f963a870c9498b6))
* **Editable:**  fixed autocomplete style prop not applying DEV-288 ([881111d1](https://github.com/micromed-dev/herz-ui/commit/881111d19b7c04b60146be8fe7b086c9c045b61a))

#### 0.9.1 (2021-07-05)

##### New Features

* **Snackbar:**  Added hook and provider exports DEV-253 ([8376a081](https://github.com/micromed-dev/herz-ui/commit/8376a0813f7986245060760c06782a080ce8af0e))

#### 0.9.0 (2021-07-05)

##### Chores

* **Storybook:**  Updated storybook DEV-253 ([c0114886](https://github.com/micromed-dev/herz-ui/commit/c01148863bdafd2bb4eafe4b2ac67d3d1e0dd546))

##### New Features

* **Snackbar:**
  *  Added useSnackbar hook and Provider DEV-253 ([fb915f6a](https://github.com/micromed-dev/herz-ui/commit/fb915f6aa5a99a9f33ed9cd65f1ca8ef5393ee26))
  *  Added Snackbar component DEV-253 ([b1725677](https://github.com/micromed-dev/herz-ui/commit/b1725677d6afc4f229cbab6be82c48620f65ea89))

##### Tests

* **Snackbar:**  Added tests and snapshots DEV-253 ([cdb2c56b](https://github.com/micromed-dev/herz-ui/commit/cdb2c56b09cfddcd082411bc2562b4037a5a69f1))

#### 0.8.0 (2021-06-30)

##### New Features

*  fix issues pointed on PR ([2444c4aa](https://github.com/micromed-dev/herz-ui/commit/2444c4aa46a11dcfd3d7d874a4acc26345e5bc09))
* **Tabs:**
  *  change css properties to use constraints from theme ([1f3c1f56](https://github.com/micromed-dev/herz-ui/commit/1f3c1f563ac0cfbc46b7f31a6235243792a74819))
  *  Update styles to match theme default colors ([0898602e](https://github.com/micromed-dev/herz-ui/commit/0898602e42846d26181181ae6b1811051275eb32))
* **Tab:**
  *  Upgrade tab styles and component signature ([a57f77bb](https://github.com/micromed-dev/herz-ui/commit/a57f77bb7c142fd0657efc1276fdc67a7b82d7aa))
  *  Add Tab Component ([d7ec2b16](https://github.com/micromed-dev/herz-ui/commit/d7ec2b1694ad03b90ae319205b4a77093f7fe2d6))

##### Other Changes

* micromedio/herz-ui into DEV-203 ([126cd739](https://github.com/micromed-dev/herz-ui/commit/126cd739a4ddf52b60086a64ab26fbbfea667052))
* micromedio/herz-ui into DEV-203 ([d35072f9](https://github.com/micromed-dev/herz-ui/commit/d35072f974246304178c663f52389598917d4c2a))

#### 0.7.1 (2021-06-16)

##### New Features

* **Accordion:**
  *  Added backgroundColor prop DEV-204 ([06521acc](https://github.com/micromed-dev/herz-ui/commit/06521acc5898a55285030ca975c4a06433f8c851))
  *  Added Accordion component DEV-204 ([322105a9](https://github.com/micromed-dev/herz-ui/commit/322105a965fa537bfccbb5a66d7330d0a24cf760))
* **Tag:**  Added Tag component DEV-44 ([12064e27](https://github.com/micromed-dev/herz-ui/commit/12064e2765ca890f11962be1887956b4728047e5))

##### Bug Fixes

* **Popover:**
  *  Update tests to implement findBy instead of waitFor, in queries ([799484ee](https://github.com/micromed-dev/herz-ui/commit/799484ee33d645a5d42f7219f2c997df9cf123e0))
  *  solving tests ([05e7d07d](https://github.com/micromed-dev/herz-ui/commit/05e7d07d599f4d9913951800f8d6e62b34f55cfd))
  *  make sure props.render is available ([467f05c9](https://github.com/micromed-dev/herz-ui/commit/467f05c9ee6bd7e647b308b2d67e3f1a6219a9b9))
  *  Tippy bug on inputs getting height: 0 ([fd2f569b](https://github.com/micromed-dev/herz-ui/commit/fd2f569b52816a55f54381edcc84180e8c34feb7))

##### Tests

* **Accordion:**
  *  updated snapshots DEV-204 ([69cacae0](https://github.com/micromed-dev/herz-ui/commit/69cacae026fe1b25580a1f7bad7a6a1262883f2c))
  *  Added story snapshots DEV-204 ([d26da876](https://github.com/micromed-dev/herz-ui/commit/d26da876a64b6d15518d18213bd0eeba6cf310ab))
* **Tag:**  Added snapshots DEV-44 ([ea0667c3](https://github.com/micromed-dev/herz-ui/commit/ea0667c363c484b07388b3382e65276d696079ae))

#### 0.7.0 (2021-06-10)

##### Breaking Changes

*  Updated theme-ui DEV-94 ([3b1552af](https://github.com/micromed-dev/herz-ui/commit/3b1552afaad5f087293ef7ba8b02b50de0eb1abd))
*  Updated theme-ui DEV-94 ([1691a5c7](https://github.com/micromed-dev/herz-ui/commit/1691a5c7f504289f11851bdbde09644f43ef5db4))

##### Chores

*  removed comment DEV-94 ([ffb635c9](https://github.com/micromed-dev/herz-ui/commit/ffb635c98487539514df90542e94b884d8d4adf9))
*  update packages ([e583457a](https://github.com/micromed-dev/herz-ui/commit/e583457a9a3b1692799e64eab1d297376b5635f2))
*  updated storybook, added addons ([7cca9cac](https://github.com/micromed-dev/herz-ui/commit/7cca9cac38018f8bbf6a3e4b2952e103c64d45bb))
*  update packages ([a7dbc2cd](https://github.com/micromed-dev/herz-ui/commit/a7dbc2cdad5b2aa116d1d45dbe6f4580632babb1))

##### Bug Fixes

*  prettier auto fix DEV-94 ([ff23b687](https://github.com/micromed-dev/herz-ui/commit/ff23b687cdf535fb6dc25ef53917d70f7b1e3524))
* **Select:**  Fixed select opening on hover ([dc86f9cd](https://github.com/micromed-dev/herz-ui/commit/dc86f9cdd65a21c1ed9a1ba06d0b86390cc73647))

##### Other Changes

* micromedio/herz-ui into DEV-94 ([ea5098c0](https://github.com/micromed-dev/herz-ui/commit/ea5098c05ae12fb9bc191f3c777a931b1d6d5781))

##### Refactors

*  updater default color usage DEV-94 ([1b0d9e56](https://github.com/micromed-dev/herz-ui/commit/1b0d9e56b6940a4a9bb82a144f332d577c39abf0))

##### Tests

*  updated snapshot DEV-94 ([c95e90d6](https://github.com/micromed-dev/herz-ui/commit/c95e90d60cfc28728d92ad2bd8d808ec92cff0ee))

#### 0.6.0 (2021-06-01)

##### Breaking Changes

* **EditableText:**  Deprecate component DEV-194 ([23469515](https://github.com/micromed-dev/herz-ui/commit/23469515493e2e816603b4ee4a3828f6f84dc0c5))

##### Chores

*  prettier DEV-194 ([516b7ece](https://github.com/micromed-dev/herz-ui/commit/516b7ece618cb10b135dc6da7ddf3d795ab74d4b))
*  removed comments DEV-194 ([d64d42b3](https://github.com/micromed-dev/herz-ui/commit/d64d42b3e5e2a91f5f25ec6ad0db5ed0244ed943))

##### Documentation Changes

* **EditableField:**  Added docs DEV-194 ([8e3f8d2c](https://github.com/micromed-dev/herz-ui/commit/8e3f8d2ca8e2933608cf4f297381ba2937425704))

##### New Features

* **EditableField:**
  *  Added Select EditableField component DEV-193 ([#112](https://github.com/micromed-dev/herz-ui/pull/112)) ([01575201](https://github.com/micromed-dev/herz-ui/commit/01575201db17c61cb59d2ba07a25f28739d693bd))
  *  Added EditableField component with Group and Text DEV-194 ([2e3ab717](https://github.com/micromed-dev/herz-ui/commit/2e3ab717b0b9946c8803e114576bfed7ff7147bf))
* **Docs:**  Add typography and color docs to styleguidist ([d2e54977](https://github.com/micromed-dev/herz-ui/commit/d2e54977a30bd97b97e51cdbfb8ef76e827a515e))
* **Radio:**
  *  Update value to be received by radio.group DEV-136 ([8f0c0428](https://github.com/micromed-dev/herz-ui/commit/8f0c042828b6368cb9846222fafb0c2e328e6658))
  *  Add snapshots and solve storybook issues DEV-136 ([576130b8](https://github.com/micromed-dev/herz-ui/commit/576130b845605ff2786d11eeab4a2fdad2d2def3))
  *  Add radio group context capabilities ([8ab1d2fb](https://github.com/micromed-dev/herz-ui/commit/8ab1d2fbd0ae2ba96be341689d62191f0a5b3f2c))
  *  add Radio Group component ([372fb510](https://github.com/micromed-dev/herz-ui/commit/372fb510270b6e5915437a1913087f6fbca772e0))
  *  send storyshots to repo ([8ad3694c](https://github.com/micromed-dev/herz-ui/commit/8ad3694caafa9f4124cd104fb1df028796a5fa25))
  *  Add Radio Component DEV-136 ([a7e7b891](https://github.com/micromed-dev/herz-ui/commit/a7e7b8911825f18018a940d6475a49730f3c2b3b))

##### Bug Fixes

* **Popover:**  Fixed popover overlay bug ([92bcfeec](https://github.com/micromed-dev/herz-ui/commit/92bcfeec44d58f43747c3bead8b96493b2b0e66b))

##### Other Changes

* **Radio:**  fix mistake of value definition and make possible control radio from outside ([7298788b](https://github.com/micromed-dev/herz-ui/commit/7298788bbf9de5d6597233b0dac4fc8b915c3d06))
* micromedio/herz-ui into DEV-136 ([ed412b08](https://github.com/micromed-dev/herz-ui/commit/ed412b08e352cb73da68cd9a695b6aadb894ebea))

##### Tests

* **EditableField:**
  *  Added storyshots DEV-194 ([de687eab](https://github.com/micromed-dev/herz-ui/commit/de687eab88a4888eb96460506bdc1b604715963e))
  *  Added tests DEV-194 ([42eddb9d](https://github.com/micromed-dev/herz-ui/commit/42eddb9dbd2acdc168a8d210794049522ba8578f))

#### 0.5.0 (2021-05-20)

##### Breaking Changes

* **Selector:**  Deprecated Selector DEV-53 ([18eb3f0b](https://github.com/micromed-dev/herz-ui/commit/18eb3f0b7325c2a3d8584865d3d728e0b1de37f8))

##### Chores

*  updated release-it configs ([f1ec16f0](https://github.com/micromed-dev/herz-ui/commit/f1ec16f04de7ff188664bc8398605dd049675309))

##### Documentation Changes

* **DateSelect:**  Added DateSelect docs DEV-53 ([a10204b2](https://github.com/micromed-dev/herz-ui/commit/a10204b2d6d707f6c5881863c3e21c9aeaef298a))
* **Select:**  Fixed docs DEV-53 ([9f9ddc62](https://github.com/micromed-dev/herz-ui/commit/9f9ddc622dd13920b7e4d51e9ca9b3aef1a20e01))
* **herz:**
  *  fix typos and description on README (DEV-93) ([03a71398](https://github.com/micromed-dev/herz-ui/commit/03a713989f2a14c6c4d4cae126e751d895543218))
  *  update contributing description (DEV-93) ([4b932011](https://github.com/micromed-dev/herz-ui/commit/4b9320113d7bbcbd45ec83d465c6be29f5120661))
  *  Update README and add CONTRIBUTING files ([fa85189a](https://github.com/micromed-dev/herz-ui/commit/fa85189a7d129ec77ca3a765098c69b4218e0150))
* **core:**  Add changelog document with 0.4.5 (DEV-93) ([048978c4](https://github.com/micromed-dev/herz-ui/commit/048978c44044775c50a15a0fc6502c852eeb4aed))

##### New Features

* **Autocomplete:**  Add Autocomplete component DEV-152 ([#103](https://github.com/micromed-dev/herz-ui/pull/103)) ([3771df76](https://github.com/micromed-dev/herz-ui/commit/3771df763ffed29f0b14556c5165aa892824b273))
* **DateSelect:**
  *  Add hideCustom prop DEV-53 ([b4b02e44](https://github.com/micromed-dev/herz-ui/commit/b4b02e449f8e9a4e02f55c70a9b5f47ffa6b955c))
  *  Added error states DEV-53 ([7a60d8b6](https://github.com/micromed-dev/herz-ui/commit/7a60d8b6d0f07dcee17f09006d4cd802f09ce494))
  *  Added DateSelect component DEV-53 ([b9c58a31](https://github.com/micromed-dev/herz-ui/commit/b9c58a314cf454bcaa6e40fce01a5515b01d0b0d))
* **Select:**
  *  Added custom option component DEV-53 ([56b7356d](https://github.com/micromed-dev/herz-ui/commit/56b7356d32deea97e8eddc7f6267f01e0dee73d2))
  *  Added new Select component DEV-53 ([6fe64090](https://github.com/micromed-dev/herz-ui/commit/6fe64090790a975dbe5964b4b467382c721983d9))
* **Popover:**  Added props to style content and box DEV-53 ([46d500d2](https://github.com/micromed-dev/herz-ui/commit/46d500d2620b775e6062de0d6a4ec2b24c627663))
* **InputGroup:**  Added InputGroup component DEV-137 ([d3d166ce](https://github.com/micromed-dev/herz-ui/commit/d3d166ce88ac66f6c4ceae05be406d45df187c44))
* **Highlight:**  Added Highlight component and colors to the theme DEV-162 ([#100](https://github.com/micromed-dev/herz-ui/pull/100)) ([25558689](https://github.com/micromed-dev/herz-ui/commit/255586894f82da7815c86f94df95f8cc62974fe9))
* **TextField:**  Add onBlur prop ([410e9b6b](https://github.com/micromed-dev/herz-ui/commit/410e9b6b985749bd5f549e7457b8a2ccf76e63d9))
* **Input:**  Add onBlur prop ([f3520821](https://github.com/micromed-dev/herz-ui/commit/f3520821d8676293f421cd0b2a74920a23f22200))

##### Bug Fixes

* **Select:**
  *  fixed issue when children has nested arrays DEV-53 ([bea0ce11](https://github.com/micromed-dev/herz-ui/commit/bea0ce11bcb269ac1b2fcbf50b980b7b82657ffa))
  *  Renamed SelectOption type DEV-53 ([e8ae33b8](https://github.com/micromed-dev/herz-ui/commit/e8ae33b85dc85c021416ca95efb9aed789bcc995))
  *  Fixed prop typo DEV-53 ([100e13f7](https://github.com/micromed-dev/herz-ui/commit/100e13f7e2fe0ab66ffc75ef961a8a881da5773b))
  *  fixed selected bugs ([9369c81c](https://github.com/micromed-dev/herz-ui/commit/9369c81c1b9377f2b853a68c34b0b917fa8e8806))
  *  Removed Date stories DEV-53 ([5039d881](https://github.com/micromed-dev/herz-ui/commit/5039d8814d990f09129440c699457169f152b5e5))
* **InputGroup:**  Added missing export ([802ba284](https://github.com/micromed-dev/herz-ui/commit/802ba28454210a00bbfd59b730c38a45d2cbe471))
* **DateSelect:**  Fixed bug when controlled component ([84b7c68c](https://github.com/micromed-dev/herz-ui/commit/84b7c68c792f1443ed80e2346c7d031de66df7f1))
*  Added missing exports DEV-53 ([db336cab](https://github.com/micromed-dev/herz-ui/commit/db336cab10eaa89c8a8c0e65f175dc381c426606))
*  Flatten array before parsing DEV-53 ([f88a8514](https://github.com/micromed-dev/herz-ui/commit/f88a8514a3b9d91d81038a47755d0c6249a92e18))
*  fixed table checkbox showing on top of headers on scroll ([#92](https://github.com/micromed-dev/herz-ui/pull/92)) ([44f998e8](https://github.com/micromed-dev/herz-ui/commit/44f998e8c1685b0d2aa42057ad9ec274a08aac84))
*  fixed table checkbox alignment ([#91](https://github.com/micromed-dev/herz-ui/pull/91)) ([31faa26a](https://github.com/micromed-dev/herz-ui/commit/31faa26a72265688ba03bac642f332f0f69010c5))
* **Selector:**  Fixed bug when all options are default options DEV-53 ([038fc2e5](https://github.com/micromed-dev/herz-ui/commit/038fc2e5d9001c924831a65313a6b882f136c2ed))

##### Other Changes

* **Select:**  Added snapshots DEV-53 ([f91db5e7](https://github.com/micromed-dev/herz-ui/commit/f91db5e7c74c2462751af17d6a7a66c12cf6c62f))
* micromedio/herz-ui into DEV-93 ([55eb8b06](https://github.com/micromed-dev/herz-ui/commit/55eb8b06a47d10f360e49c3b2613f64f7a3cb4e3))
*  Refactor TableFilters ([#95](https://github.com/micromed-dev/herz-ui/pull/95)) ([1f91a546](https://github.com/micromed-dev/herz-ui/commit/1f91a5469bcbd85f6edbce0c43331d091900fdce))
*  Added error/success states to input and text field ([#96](https://github.com/micromed-dev/herz-ui/pull/96)) ([d4b25b34](https://github.com/micromed-dev/herz-ui/commit/d4b25b348c0bd930b4a92a4c3ac47386578692c2))
*  Fixed tittle letterSpaccing ([#89](https://github.com/micromed-dev/herz-ui/pull/89)) ([8fb87b03](https://github.com/micromed-dev/herz-ui/commit/8fb87b0391670d774f8f9040592379c4a5ced9e0))
*  New MobileModal Component. ([#88](https://github.com/micromed-dev/herz-ui/pull/88)) ([873a9210](https://github.com/micromed-dev/herz-ui/commit/873a921065e388a640cc9b18dbb9bcac4c6f9e57))
* micromedio/herz-ui into DEV-93 ([185fcdbc](https://github.com/micromed-dev/herz-ui/commit/185fcdbcbbffd77ff0dcb4913ee3c98bd6bb7396))

##### Refactors

* **DateSelect:**  Removed mask, added placeholder DEV-53 ([d19342b6](https://github.com/micromed-dev/herz-ui/commit/d19342b6f1309db3fc064369056a46b78415a800))
*  changed ValueList label from string to ReactNode ([#93](https://github.com/micromed-dev/herz-ui/pull/93)) ([c358b98b](https://github.com/micromed-dev/herz-ui/commit/c358b98bae6a02a9cb8e0a5ed315116a908d29c2))

##### Tests

* **DateSelect:**
  *  improved tests DEV-53 ([7ff7d25e](https://github.com/micromed-dev/herz-ui/commit/7ff7d25e88c687ea4d02bcb3f5d1ed528d3fe765))
  *  Added tests DEV-53 ([d278894c](https://github.com/micromed-dev/herz-ui/commit/d278894c0ba3678d8ea29a0cf474c24921ef32f8))

### Unreleased
##### Bug Fixes
* 

#### 0.4.5 (2021-05-05)

##### Bug Fixes

*  fixed table checkbox showing on top of headers on scroll ([#92](https://github.com/micromed-dev/herz-ui/pull/92)) ([44f998e8](https://github.com/micromed-dev/herz-ui/commit/44f998e8c1685b0d2aa42057ad9ec274a08aac84))
*  fixed table checkbox alignment ([#91](https://github.com/micromed-dev/herz-ui/pull/91)) ([31faa26a](https://github.com/micromed-dev/herz-ui/commit/31faa26a72265688ba03bac642f332f0f69010c5))

##### Other Changes

*  Fixed tittle letterSpaccing ([#89](https://github.com/micromed-dev/herz-ui/pull/89)) ([8fb87b03](https://github.com/micromed-dev/herz-ui/commit/8fb87b0391670d774f8f9040592379c4a5ced9e0))
*  New MobileModal Component. ([#88](https://github.com/micromed-dev/herz-ui/pull/88)) ([873a9210](https://github.com/micromed-dev/herz-ui/commit/873a921065e388a640cc9b18dbb9bcac4c6f9e57))

##### Refactors

*  changed ValueList label from string to ReactNode ([#93](https://github.com/micromed-dev/herz-ui/pull/93)) ([c358b98b](https://github.com/micromed-dev/herz-ui/commit/c358b98bae6a02a9cb8e0a5ed315116a908d29c2))


### 0.4.4 (2021-04-00) - Previous Versions

#### All previous base components
* Alert 
* Breadcrumb
* Buttons
* Card
* Checkbox
* EditableText
* FloatingCard
* Icon (using Tabler Icons)
* ListSelect
* MobileModal
* Pagination
* Paper
* Popover
* Selector
* Table
* TableFilters
* TextField
* Tooltip
* Uploader
* ValueList
