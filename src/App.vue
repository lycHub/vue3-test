<template>
  <div id="app">
    <button @click="changeValue">change value</button>
<!--    <cascade :options="options" :value="value" @change="valueChange" />-->
    <p>value: {{ value }}</p>
    <cascade :options="options" v-model:value="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Cascade from './components/Cascade/Cascade.vue';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo'
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  },
  {
    value: 'aomen',
    label: 'aomen'
  }
];

export default defineComponent({
  name: 'App',
  components: {
    Cascade
  },
  
  setup(props, context) {
    // const value = ref<string[]>([]);
    const value = ref<string[]>(['zhejiang', 'ningbo']);
    const changeValue = (): void => {
      // value.value = ['zhejiang', 'ningbo'];
      value.value = ['zhejiang', 'hangzhou', 'xihu'];
    }
    const valueChange = (newValue: string[]) => {
      console.log('valueChange', newValue);
    }
    return {
      options,
      value,
      changeValue,
      valueChange
    }
  }
});
</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  #app {
    margin: 100px 300px;
  }
</style>
