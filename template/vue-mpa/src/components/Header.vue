<template>
  <div class="header">
    <img class="logo" src="../assets/logo.png" alt="">
    <ul class="nav-list">
      <li><a :class="{active: pathName === '/page1.html'}" href="/page1.html">Page1</a></li>
      <li><a :class="{active: pathName === '/page2.html'}" href="/page2.html">Page2</a></li>
      <li><a :class="{active: pathName === '/page3.html'}" href="/page3.html">Page3</a></li>
    </ul>
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  background: #333;
  overflow: hidden;
  padding: 0 30px;
  .logo{
    height: 50px;
  }
  .nav-list{
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 30px;
    a{
      display: block;
      line-height: 60px;
      height: 60px;
      font-size: 24px;
      margin: 0 15px;
      padding: 0 5px;
      color: #FFF;
      position: relative;
      &.active{
        &::after{
          content: '';
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          background: #FF6701;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "common-header",
  data() {
    return {
      pathName: location.pathname,
    };
  },
  methods: {
    handleSelect() {

    },
  },
};
</script>

