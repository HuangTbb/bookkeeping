<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <EditItem
      field-name="日期"
      placeholder="请输入日期"
      :value.sync="record.createdAt"
      type="date"
    />
    <EditItem
      field-name="备注"
      placeholder="请输入备注"
      :value.sync="record.notes"
    />
    <Tags @update:value="onSelectTags" />
    <Tabs
      class-prefix="types"
      :data-source="typeList"
      :value.sync="record.type"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import EditItem from "@/components/Money/EditItem.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import store from "@/store";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/contants/typeList";

@Component({
  components: { Tabs, Tags, NumberPad, EditItem },
})
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  typeList = typeList;

  created() {
    store.commit("fetchRecords");
  }
  mounted() {
    if (document.body.clientWidth < 500) {
      (document.querySelector(".Nav-wrapper") as HTMLElement).style.height =
        document.body.clientHeight.toString() + "px";
    }
  }

  // eslint-disable-next-line no-undef
  onSelectTags(value: Tag[]) {
    this.record.tags = value;
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请至少选择一个标签");
    }
    if (this.$store.state.createRecordError === null) {
      this.$store.commit("createRecord", this.record);
      window.alert("已保存");
      this.record.notes = "";
    }
  }
}
</script>
<style lang="scss">
@import "~@/assets/style/helper.scss";

.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
