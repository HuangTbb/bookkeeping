<template>
  <div>
    <div class="back">
      <GotoBack />
      <span>近30天{{ typeToWord }}统计图</span>
      <div class="fill" />
    </div>
    <div class="chartTitle">
      <p>近30天总{{ typeToWord }}：{{ totalMoney.toString() }} 元</p>
    </div>
    <div class="chartBox-wrapper" ref="chartWrapper">
      <div class="chartBox" ref="container"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import * as echarts from "echarts";
import groupedList from "@/lib/groupedList";
import GotoBack from "@/components/GotoBack.vue";
import _ from "lodash";
import dayjs from "dayjs";

@Component({
  components: { GotoBack },
})
export default class Echart extends Vue {
  type: string = this.$route.query.type as string;
  typeToWord: string = this.type === "-" ? "支出" : "收入";
  totalMoney: number = 0;
  key: string[] | undefined;
  value: (number | undefined)[] | undefined;
  get dataList() {
    return groupedList(this.type);
  }

  get keyValueList() {
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(new Date())
        .subtract(i, "day")
        .format("YYYY-MM-DD");
      const found = _.find(this.dataList, {
        title: dateString,
      });
      console.log(this.dataList);
      array.push({ key: dateString, value: found ? found.total : 0 });
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get option() {
    return {
      color: ["#232428"],
      grid: {
        left: 16,
        right: 80,
        top: 80,
      },
      tooltip: {
        trigger: "item",
        position: "top",
      },
      xAxis: {
        type: "category",
        axisTick: {
          alignWithLabel: true,
          inside: true,
        },
        axisLine: {
          show: false,
        },
        data: this.key,
      },
      yAxis: {
        type: "value",
        position: "right",
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: this.value,
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "#efefef",
            borderRadius: [10, 10, 10, 10],
          },
          itemStyle: {
            barBorderRadius: [10, 10, 10, 10],
          },
          label: {
            position: "top",
            show: true,
            distance: 10,
            fontWeight: "bold",
          },
        },
      ],
    };
  }

  countTotalMoney() {
    if (this.value) {
      this.value.map((item) => {
        if (item) {
          this.totalMoney += item;
        }
      });
    }
    this.totalMoney = Math.floor(this.totalMoney * 100) / 100;
  }

  mounted() {
    this.key = this.keyValueList.map((item) => item.key.substr(5, 5));
    this.value = this.keyValueList.map((item) => item.value);

    this.countTotalMoney();

    const el = this.$refs.container as HTMLElement;
    if (el) {
      el.style.height = `${document.documentElement.clientWidth * 1.2}px`;
      let chart = echarts.init(el);
      this.option && chart.setOption(this.option);
    }
    (this.$refs.chartWrapper as HTMLElement).scrollLeft = el.scrollWidth;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
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
.chartTitle {
  text-align: center;
  margin: 0 14px 10px 14px;
  background: #ffffff;
  border-radius: 20px;
  > p {
    padding: 10px;
  }
}

.chartBox {
  width: 440%;
  background: #fff;
  margin-top: 15px;
  border-radius: 20px;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
