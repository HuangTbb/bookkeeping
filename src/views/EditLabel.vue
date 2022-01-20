<template>
  <div class="editPag">
    <div class="back">
      <GotoBack />
      <span>编辑标签</span>
      <div class="fill" />
    </div>
    <EditItem
      :value="tag.name"
      @update:value="updateTag"
      field-name="标签名"
      placeholder="请输入标签名"
    />
    <div class="editButtons">
      <Button @click="comfirm">修改</Button>
      <Button @click="remove">删除</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import EditItem from "@/components/Money/EditItem.vue";
import Button from "@/components/Button.vue";
import GotoBack from "@/components/GotoBack.vue";

@Component({
  components: { GotoBack, Button, EditItem },
})
export default class EditLabel extends Vue {
  newName: string = "";

  get tag() {
    return this.$store.state.currentTag;
  }

  created(): void {
    this.$store.commit("fetchTags");
    this.$store.commit("findTag", this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    } else {
      this.newName = this.tag.name;
    }
  }

  updateTag(name: string) {
    this.newName = name;
  }

  comfirm() {
    if (this.tag) {
      if (this.newName === "") {
        window.alert("标签名不能为空！");
      } else if (this.newName.indexOf(" ") >= 0) {
        window.alert("标签名不能包含空格！");
      } else if (this.tag.name === this.newName) {
        this.$router.replace("/labels/");
      } else {
        this.$store.commit("updateTag", {
          id: this.tag.id,
          newName: this.newName,
        });
        if (this.$store.state.newNameStatus === "duplicated") {
          window.alert("标签名已存在，请重新输入");
        } else {
          this.$router.replace("/labels/");
        }
      }
    }
  }

  remove() {
    if (this.tag) {
      this.$store.commit("removeTag", this.tag.id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.editPag {
  height: 100vh;

  .back {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px;
    > .fill {
      width: 70px;
      height: 70px;
    }
  }

  .editFormBox {
    border: none;
  }

  .editButtons {
    display: flex;
    justify-content: space-evenly;
    margin: 40px 0;
  }
}
</style>
