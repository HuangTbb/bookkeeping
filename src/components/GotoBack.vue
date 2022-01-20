<template>
  <div @click="$router.go(-1)" class="backIcon">
    <Icon name="back" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class GotoBack extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.backIcon {
  background: #fff;
  border-radius: 50%;
  margin: 14px;
  padding: 3px 5px;
  display: inline-block;
  .icon {
    width: 2em;
    height: 2em;
    color: $focused-color;
  }
}
</style>
