<template>
  <div class="numberPad">
    <div class="resultBox">
      <div class="outputSum">￥{{ outputSum }}</div>
      <div class="output">{{ outputCon }}</div>
    </div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent">+</button>
      <button @click="remove"><Icon name="clear" /></button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="clear">C</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">×</button>
      <button @click="ok" class="ok" :style="'height:' + okHeight + 'px'">
        ok
      </button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">÷</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  outputCon: string = "0";
  outputSum: string = this.value.toString();
  okHeight: number = 0;
  inputContent(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    const eachNum = this.outputCon.split(/[- |+|×|÷]/g);

    if (this.outputCon === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.outputCon = this.outputCon.slice(0, -1);
      }
    }
    if (
      this.outputCon.substr(-1, 1) === "0" &&
      "+-×÷".indexOf(this.outputCon.substr(-2, 1)) >= 0 &&
      "+-×÷".indexOf(input) < 0
    ) {
      this.outputCon = this.outputCon.slice(0, -1);
    }

    if (this.outputCon.slice(-1) === ".") {
      if ("+-×÷".indexOf(input) >= 0) {
        this.outputCon = this.outputCon.slice(0, -1);
      }
    }
    if (this.outputCon.indexOf(".") >= 0) {
      if (eachNum[eachNum.length - 1].indexOf(".") >= 0 && input === ".") {
        return;
      }
    }
    if ("+-×÷".indexOf(this.outputCon.slice(-1)) >= 0) {
      if ("+-×÷".indexOf(input) >= 0) {
        return;
      } else if (input === ".") {
        this.outputCon += "0" + input;
        return;
      }
    }
    this.outputCon += input;
    this.countSum();
  }

  countSum(): void {
    const eachNums = this.outputCon.split(/[- |+|×|÷]/g);
    const signArray = this.outputCon.split(/[\d.]+/);
    let sum = 0;
    let n = 0;

    signArray.map((x, index) => {
      if ("+-×÷".indexOf(x) < 0 || x === "") {
        signArray.splice(index, 1);
      }
    });
    for (let i = 0; i < eachNums.length; i++) {
      const num = parseFloat(eachNums[i]);
      if (isNaN(num)) {
        continue;
      }
      if (i === 0) {
        sum += num;
        continue;
      }
      if (signArray[n] === "+") {
        sum += num;
      } else if (signArray[n] === "-") {
        sum -= num;
      } else if (signArray[n] === "×") {
        sum *= num;
      } else if (signArray[n] === "÷") {
        sum /= num;
      }
      n += 1;
    }
    this.outputSum = (Math.floor(sum * 100) / 100).toString();
  }

  remove(): void {
    if (this.outputCon.length === 1) {
      this.outputCon = "0";
      this.outputSum = "0";
    } else {
      this.outputCon = this.outputCon.slice(0, -1);
      this.countSum();
    }
  }

  clear(): void {
    this.outputCon = "0";
    this.outputSum = "0";
  }

  ok(): void {
    const number = parseFloat(this.outputSum);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.outputCon = "0";
    this.outputSum = "0";
  }
  mounted(): void {
    const ok: HTMLElement | null = document.querySelector(".ok");
    if (ok) {
      this.okHeight =
        120 + parseInt(getComputedStyle(ok).marginTop.split("px")[0]) * 2;
    } else {
      this.okHeight = 120;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .resultBox {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .output,
    .outputSum {
      font-family: Consolas, monospace;
      padding: 0 14px;
    }
    .output {
      font-size: 28px;
      text-align: right;
      word-break: break-all;
      flex-grow: 1;
    }
    .outputSum {
      font-size: 20px;
    }
  }

  .buttons {
    @extend %clearFix;
    padding: 2px;
    font-size: 20px;
    > button {
      width: 18%;
      height: 60px;
      background: $main-color;
      float: left;
      border-radius: 30px;
      margin: 1%;
      box-shadow: -2px -2px 5px rgba($color: #000000, $alpha: 0.1);
      &.ok {
        height: 60px * 2;
        float: right;
      }
      &.zero {
        width: 38%;
      }
    }

    > button:nth-child(5) {
      > .icon {
      }
    }
  }
}
</style>
