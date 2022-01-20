<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />
      <p>标签</p>
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      <p>记账</p>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      <p>统计</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background: #ffffff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 5px;
  > .item {
    width: 33.33333%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 4px 0 2px 0;
    color: $unfocused-color;
    > p {
      font-size: 10px;
    }
    > .icon {
      width: 1.3em;
      height: 1.3em;
      margin-bottom: 2px;
    }
  }
  > .item.selected {
    color: $focused-color;
  }
}
</style>
