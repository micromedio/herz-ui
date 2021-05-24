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