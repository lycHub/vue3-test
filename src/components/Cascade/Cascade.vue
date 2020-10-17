<template>
  <div class="cascade" v-clickOutSide="hideColumn">
    <div class="cascade-control" @click="showColumns = !showColumns">
      <input class="cascade-input" :value="inputValue" readonly />
    </div>
    <div class="cascade-menus" v-show="showColumns">
      <ul class="cascade-column" v-for="(menu, index) of columns" :key="index">
        <li
          class="cascade-column-item"
          @click.stop="itemClick(item, index)"
          :class="{ checked: trueValue.includes(item.value) }"
          v-for="item of menu" :key="item.value">
          <span class="text">{{ item.label }}</span>
          <i v-show="item.children && item.children.length">&gt;</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" src="./Cascade.ts"></script>

<style lang="scss" scoped>
  .cascade {
    position: relative;
    display: inline-block;
    color: rgba(0,0,0,.85);
    font-size: 16px;
    line-height: 1.5715;
    background-color: #fff;
    border-radius: 2px;
    cursor: pointer;
    transition: color .3s;
    .cascade-control {
      cursor: pointer;
      .cascade-input {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #ced4da;
        outline: none;
        padding: 6px 12px;
      }
    }
    .cascade-menus {
      position: absolute;
      top: 40px;
      font-size: 14px;
      white-space: nowrap;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
      .cascade-column {
        display: inline-block;
        height: 180px;
        overflow: auto;
        padding: 4px 0;
        margin: 0;
        .cascade-column-item {
          padding: 5px 12px;
          overflow: hidden;
          line-height: 22px;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
          transition: all .3s;
          &:hover, &.checked {
            background-color: #e6f7ff;
          }
        }
      }
    }
  }
</style>
