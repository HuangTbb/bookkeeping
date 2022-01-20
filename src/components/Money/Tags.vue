<template>
  <div class="tegs">
    <ul class="current">
      <li
        v-for="tagg in tags"
        :key="tagg.id"
        @click="select(tagg.name)"
        :class="{ selected: selectedTags.indexOf(tagg.name) >= 0 }"
      >
        {{ tagg.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import Vue from "vue";
import CreateTags from "@/components/createTags.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { CreateTags, Button },
  computed: {
    tags() {
      return this.$store.state.tagList;
    },
  },
})
export default class Tags extends Vue {
  // eslint-disable-next-line no-undef
  selectedTags: Tag[] = [];

  @Watch("selectedTags")
  onSelectedTagsChange(value: string[]): void {
    this.$emit("update:value", value);
  }
  created(): void {
    this.$store.commit("fetchTags");
  }
  // eslint-disable-next-line no-undef
  select(tag: Tag): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tegs {
  flex-grow: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  .current {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    > li {
      $hei: 28px;
      height: $hei;
      line-height: $hei;
      border-radius: 12px;
      padding: 0 20px;
      margin: 10px;
      background: #ffffff;

      &.selected {
        background: $focused-color;
        color: #ffffff;
      }
    }
  }
}
</style>
