<template>
  <div class="Nav-wrapper">
    <div class="container" :class="`${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class Layout extends Vue{
  @Prop(String) readonly classPrefix!: string;
}
</script>

<style lang="scss" scoped>
.Nav-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.container{
  flex-grow: 1;
  overflow: auto;
}
</style>