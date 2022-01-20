<template>
  <Layout>
    <div class="tags">
      <router-link
        v-for="tag in tags"
        :key="tag.id"
        class="tag"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="detail" />
      </router-link>
    </div>
    <Button @click="addTags = true">新增标签</Button>
    <create-tags :value.sync="addTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import CreateTags from "@/components/createTags.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { Button, CreateTags },
  computed: {
    tags() {
      return this.$store.state.tagList;
    },
  },
})
export default class Labels extends Vue {
  addTags: boolean = false;
  created(): void {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  padding: 0 14px;
  margin-top: 20px;
  > .tag {
    padding: 15px 15px 15px 18px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-radius: 20px;
    b .icon {
      width: 2.2em;
      height: 2.2em;
      color: $focused-color;
    }
  }
}
.addTagsButton {
  margin: 50px 0;
}
</style>
