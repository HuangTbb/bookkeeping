<template>
  <div class="editFormBox">
    <label class="editForm">
      <span class="name">{{ fieldName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="type || 'text'"
          :value="formatDate(value)"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
          class="editInput"
        />
      </template>
      <template v-else>
        <input
          :type="type || 'text'"
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
          class="editInput"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import dayjs from "dayjs";

@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop(String) placeholder?: string;
  @Prop(String) type?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }

  formatDate(IOString: string) {
    return dayjs(IOString)
      .format("YYYY-MM-DD")
      .toString();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.editFormBox {
  margin-bottom: 10px;
  .editForm {
    font-size: 14px;
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 20px;
    padding: 3px 0;
    .name {
      white-space: nowrap;
      padding-left: 20px;
      padding-right: 10px;
    }
    > input {
      border: none;
      height: 50px;
      flex-grow: 1;
      padding: 0 8px;
      border-radius: 10px;
    }
  }
}
</style>
