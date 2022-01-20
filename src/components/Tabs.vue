<template>
  <ul
    class="tabs"
    :class="{ [this.classPrefix + '-tabsBox-item']: this.classPrefix }"
  >
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="liClass(item)"
      @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  liClass(item: DataSourceItem) {
    return {
      selected: item.value === this.value,
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
    };
  }
  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs {
  display: flex;
  justify-content: left;
  margin: 14px 0 0 14px;
  &-item {
    padding: 0 4px;
    color: $unfocused-color;
    font-size: 16px;
    margin: 5px 10px;
    &.selected {
      font-weight: bold;
      border-bottom: 2px solid $focused-color;
      color: $focused-color;
    }
  }
}
</style>
