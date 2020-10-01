<template>
  <div class="main">
    <app-header />
    <div class="main-content">
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import appHeader from './components/header.vue'
import appFooter from './components/footer.vue'

export default {
  components: {
    appHeader,
    appFooter
  }
  // },
  // mounted() {
  //   this.getRBSzha()
  //   this.getRBWsTypes()
  //   this.getRBWsSizes()
  //   this.getRBRimthickness()
  //   this.getRBStates()
  //   this.getRBDetailtags()
  //   this.getRBOperations()
  //   this.getRBCredentials()
  //   this.getDataSources()
  //   this.getRBAbMalfunctions()
  //   this.getRBDocTypes()
  //   this.getRBGreaseMarks()
  //   this.getRBStorageTypes()
  //   this.getRBWheelMalfunctions()
  //   this.getRBWSMalfunctions()
  //   this.getRBAxleMalfunctions()
  //   this.getRBHDicObjects()
  //   this.getRBAdmZhDor()
  //   this.getRBVagUkp()
  //   this.getRBHStanObj()
  // },
  // methods: {
  //   ...mapActions([
  //     'getRBSzha',
  //     'getRBWsTypes',
  //     'getRBWsSizes',
  //     'getRBRimthickness',
  //     'getRBStates',
  //     'getRBDetailtags',
  //     'getRBOperations',
  //     'getRBCredentials',
  //     'getDataSources',
  //     'getRBAbMalfunctions',
  //     'getRBDocTypes',
  //     'getRBGreaseMarks',
  //     'getRBStorageTypes',
  //     'getRBWheelMalfunctions',
  //     'getRBWSMalfunctions',
  //     'getRBAxleMalfunctions',
  //     'getRBHDicObjects',
  //     'getRBAdmZhDor',
  //     'getRBVagUkp',
  //     'getRBHStanObj'
  //   ]),
  //}
}
</script>

<style>
</style>