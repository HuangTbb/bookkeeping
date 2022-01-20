<template>
  <div class="notfound">
    <Icon name="404" />
    <Button>
      <router-link to="/">返回首页</router-link>
    </Button>
  </div>
</template>

<script lang="ts">
import Button from "@/components/Button.vue";
export default {
  name: "NotFound",
  components: { Button },
};
</script>

<style lang="scss" scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    width: 25em;
    height: 25em;
  }
}
</style>
