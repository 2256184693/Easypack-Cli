<template>
  <div class="sider">
    <ul class="nav-list">
      <li class="nav-item" v-for="(nav, index) in navs" :key="index">
        <router-link :to="nav.path">{{nav.label}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "common-sider",
  data() {
    return {
      navs: [
        {path: '/page1', label: 'Nav1'},
        {path: '/page2', label: 'Nav2'},
        {path: '/page3', label: 'Nav3'},
      ]
    };
  }
};
</script>
<style lang="scss">
.sider{
  background: #FFF;
  border-right: 1px solid #efefef;
  width: 180px;
  padding: 15px 0;
  .nav-list{
    .nav-item{
      a{
        display: block;
        height: 45px;
        line-height: 45px;
        padding-left: 20px;
        color: #333;
        &.router-link-active{
          color: #FFF;
          background: #333;
        }
        &:hover{
          background: rgba($color: #333, $alpha: .3);
          color: #FFF;
          &.router-link-active{
            color: #FFF;
            background: #333;
          }
        }
      }
    }
  }
}
</style>

