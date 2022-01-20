<template>
  <div class="addTagsButton">
    <button class="button" @click="$emit('click', $event)">
      <slot />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.addTagsButton {
  .button {
    background: $focused-color;
    padding: 12px 50px;
    margin: 10px auto;
    border: none;
    color: #fff;
    display: block;
    font-size: 14px;
    border-radius: 20px;
  }
}
</style>
