<template>
  <div id="app" class="flex-box column">
    <page-header class="flex-item"></page-header>
    <div class="flex-item last flex-box">
      <page-sider class="flex-item"></page-sider>
      <router-view class="flex-item last router-container"></router-view>
    </div>
    <page-footer class="flex-item"></page-footer>
  </div>
</template>

<script>
import Header from "components/Header.vue";
import Footer from "components/Footer.vue";
import Sider from "components/Sider.vue";

export default {
  name: "app",
  components: {
    PageHeader: Header,
    PageFooter: Footer,
    PageSider: Sider,
  }
};
</script>
<style lang="scss">
html, body{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
  .router-container{
    background: #fefefe;
    padding: 20px;
  }
}
</style>
