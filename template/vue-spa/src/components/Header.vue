<template>
  <div class="header">
    <img class="logo" src="../assets/logo.png" alt="">
    <h3 class="title">Vue-Spa Application Created By Easypack-Cli</h3>
  </div>
</template>

<style lang="scss">
.header {
  height: 120px;
  padding: 10px 20px;
  background: #999;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid #41b883;
  .logo{
    height: 100px;
  }
  .title{
    padding-left: 20px;
    flex-grow: 1;
    flex-shrink: 1;
    font-size: 32px;
    color: #35495e;
  }
}
</style>

<script>
export default {
  name: "common-header",
  data() {
    return {};
  }
};
</script>

