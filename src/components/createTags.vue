<template>
  <div :class="value ? 'container' : 'container hide'">
    <div class="createTagBox">
      <input
        type="text"
        autofocus
        placeholder="请输入标签名"
        v-model="newTagName"
        class="tagInput"
      />
      <div>
        <button class="cancel" @click="cancel">取消</button>
        <button class="define" @click="define">确定</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class createTags extends Vue {
  @Prop(Boolean) readonly value!: boolean;
  newTagName: string = "";

  created() {
    this.$store.commit("fetchTags");
  }

  get tagList() {
    return this.$store.state.tagList;
  }

  cancel(): void {
    this.setPlaceholder("请输入标签名");
    this.newTagName = "";
    this.$emit("update:value", false);
  }

  define(): void {
    const nameList = this.tagList.map((item: { name: string }) => item.name);
    if (this.newTagName === "") {
      this.setPlaceholder("标签名不能为空！");
    } else if (this.newTagName.indexOf(" ") >= 0) {
      this.newTagName = "";
      this.setPlaceholder("标签名不能包含空格！");
    } else {
      if (nameList.indexOf(this.newTagName) >= 0) {
        this.newTagName = "";
        this.setPlaceholder("标签名已存在，请重新输入");
      } else {
        this.$store.commit("createTag", this.newTagName);
        this.setPlaceholder("请输入标签名");
        this.newTagName = "";
        this.$emit("update:value", false);
      }
    }
  }

  setPlaceholder(warn: string) {
    document.querySelector(".tagInput")?.setAttribute("placeholder", warn);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.container {
  width: 100vw;
  height: 100vh;
  background: rgba($color: #ffffff, $alpha: 0.8);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &.hide {
    display: none;
  }
  .createTagBox {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    border-radius: 20px;
    width: 90%;
    background: $focused-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    > input {
      width: 80%;
      margin-top: 50px;
      margin-bottom: 30px;
      padding-bottom: 15px;
      text-align: center;
      color: #fff;
      border-bottom: 2px solid #ffffff;
    }

    > input::-webkit-input-placeholder {
      font-size: 14px;
      color: rgb(206, 206, 206);
    }
    > div {
      margin-bottom: 20px;
      margin-top: 10px;
      font-size: 14px;
      > button {
        background: transparent;
        padding: 6px 20px;

        color: #fff;
        border: 2px solid #ffffff;
        border-radius: 10px;
        &.cancel {
          margin-right: 20px;
        }
      }
    }
  }
}
@media (min-width: 500px) {
  .createTagBox {
    max-width: 300px;
  }
}
</style>
