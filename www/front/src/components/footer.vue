<!--<template>
  <footer>
    <div class="footer-container footer-image">
      <br /><br /><br /><br /><br /><br />
      <div class="is-vh-center">
        <p style="text-align: center; position: absolute; bottom: 80px;">
          Работает на платформе
          <strong>Распределённого Реестра Данных ОАО "РЖД" <br /> </strong>
          <strong>Версия: {{ gitInfo }}</strong>
        </p>
      </div>
    </div>
    <div v-if="showBottomLine" class="ticket-line">
      <p class="is-vh-center">
        <span class="icon"> <img src="/zammad-icon.png" /> </span>&nbsp;&nbsp;Есть вопросы или
        предложения по улучшению системы?&nbsp;&nbsp;<a class="blue-link" href="https://board.rosblockchain.net" target="_blank"
          >https://board.rosblockchain.net</a
        >
        <span
          style="position: absolute; right: 10px;"
          @click="showBottomLine = false"
          ><i class="fas fa-times-circle" style="cursor: pointer;"></i
        ></span>
      </p>
    </div>
  </footer>
</template>-->

<template>
  <footer class="footer">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item"><a class="title is-5" href="#">РРД РЕЛЬСЫ</a></div>
        </div>
        <div class="level-right"><a class="level-item" href="#">Обозреватель</a><a class="level-item" href="#">Маркет</a><a class="level-item" href="#">Документы</a><a class="level-item" href="#">Контакты</a></div>
      </div>
      <hr>
      <div class="columns">
        <div class="column">
          {{ gitInfo }}
        </div>
        <div class="column has-text-centered has-text-right-tablet">
          <p class="title is-6">&copy; 2020</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      // eslint-disable-next-line
      gitInfo: process.env.GIT_INFO,
      showBottomLine: true
    }
  },
  computed: {
    account() {
      return this.$store.state.profile.account
    }
  }
}
</script>

