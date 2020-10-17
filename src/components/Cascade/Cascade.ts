import { defineComponent, PropType, ref, watch, computed } from 'vue';
type BaseOption = string | number;
interface CascadeOptions {
  value: BaseOption;
  label: BaseOption;
  children?: CascadeOptions[];
}

export default defineComponent({
  name: "Cascade",
  props: {
    options: {
      type: Array as PropType<CascadeOptions[]>,
      default: () => []
    },
    value: {
      type: Array as PropType<BaseOption[]>,
      default: () => []
    }
  },
  emits: ['change', 'update:value'],
  setup(props, context) {
    const showColumns = ref(false);
    const columns = ref<CascadeOptions[][]>([]);
    const trueValue = ref<BaseOption[]>(props.value || []);
    const itemClick = (item: CascadeOptions, index: number): void => {
      trueValue.value[index] = item.value;
      trueValue.value.length = index + 1;
      if (item.children?.length) {
        columns.value[index + 1] = item.children;
        columns.value.length = index + 2;
        // console.log('columns', columns.value);
      } else {
        columns.value.length = index + 1;
      }
    }

    const findColumn = (value: BaseOption, index: number, options = props.options): void => {
      if (options.length) {
        for (const item of options) {
          if (item.value === value) {
            columns.value[index] = options;
            break;
          }
          if (item.children?.length) {
            findColumn(value, index, item.children);
          }
        }
      }
    }

    const refreshColumns = (value: BaseOption[], index = 0) => {
      if (value.length) {
        for (let a = 0; a < value.length; a++) {
          findColumn(value[a], a);
        }
      }
    }

    if (props.options?.length) {
      columns.value[0] = props.options;
    }

    if (trueValue.value.length) {
      refreshColumns(trueValue.value);
    }

    const hideColumn = () => {
      showColumns.value = false;
    }

    const inputValue = computed(() => trueValue.value.join('/'));
    watch(trueValue, newVal => {
      context.emit('update:value', newVal);
      context.emit('change', newVal);
    }, {
      deep: true
    });
    return {
      columns,
      itemClick,
      inputValue,
      trueValue,
      refreshColumns,
      showColumns,
      hideColumn
    }
  },
  watch: {
    value (newVal) {
      // console.log('watch value', newVal);
      this.trueValue = newVal || [];
      this.refreshColumns(this.trueValue);
    }
  },
  directives: {
    clickOutSide: {
      mounted (el, { value }) {
        el.handler = (event: MouseEvent) => {
          const target = event.target;
          if (!el.contains(target)) {
            value();
          }
        }
        document.addEventListener('click', el.handler);
      },
      unmounted (el) {
        document.removeEventListener('click', el.handler);
      }
    }
  }
})
