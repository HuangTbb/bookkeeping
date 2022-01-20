<template>
  <Layout>
    <div class="top">
      <Tabs class-prefix="types" :data-source="typeList" :value.sync="type" />
      <div @click="showChart" class="showEchart" ref="showEchart">
        <Icon name="chart" />
      </div>
    </div>
    <div>
      <ol v-if="groupedList.length > 0">
        <li class="message">
          <div class="totalMoney">
            <Icon :name="type === '-' ? 'countout' : 'countin'" />
            <span>{{ groupedList[0].totalMoney }}</span>
          </div>
        </li>
        <li
          v-for="(group, index) in groupedList"
          :key="index"
          class="recordsBox"
        >
          <h3>
            {{ beautifulTitle(group.title) }}<span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="detailsList">
              <span class="tagSpan">{{ tagString(item.tags) }}</span>
              <span class="noteSpan">{{ item.notes }}</span>
              <span class="amountSpan">{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="no-result">
        <Icon name="noresult" />
        <p>快去记录一笔帐吧！</p>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/contants/typeList";
import dayjs from "dayjs";
import groupedList from "@/lib/groupedList";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  typeList = typeList;

  get groupedList() {
    return groupedList(this.type);
  }

  beautifulTitle(title: string) {
    const day = dayjs(title);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  tagString(tags: string[]) {
    return tags.join(",");
  }

  showChart() {
    (this.$refs.showEchart as HTMLElement).style.color = "#76CBE5";
    this.$router.push({
      name: "Echarts",
      query: {
        type: this.type,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .tabs {
    margin-bottom: 18px;
  }
  .showEchart {
    margin-right: 14px;
    > .icon {
      color: $focused-color;
      width: 1.8em;
      height: 1.8em;
    }
  }
}

.no-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40%;
  color: $unfocused-color;
  > p {
    margin-top: 20px;
    font-weight: bold;
  }
  > .icon {
    width: 3em;
    height: 3em;
  }
}
.message {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
  .totalMoney {
    display: flex;
    align-items: center;
    > span {
      margin-left: 10px;
      font-weight: bold;
      font-size: 18px;
    }
  }
}

.recordsBox {
  margin-bottom: 10px;
  padding: 10px 0;
  line-height: 30px;
  font-size: 14px;
  background: #ffffff;
  border-radius: 20px;
  > h3 {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
  }

  .detailsList {
    margin: 0 16px;
    display: flex;
    justify-content: space-between;

    > .noteSpan {
      margin-right: auto;
      padding-left: 14px;
      padding-right: 14px;
      color: $unfocused-color;
    }
  }
}
</style>
