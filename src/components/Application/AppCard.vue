<template>
  <view class="collapse border border-#E8EBEE border-solid rounded-lg mt-3 overflow-hidden">
    <view class="flex-y-center gap-3 first-level-item h-80rpx px-3 bg-#FCFCFC">
      <CheckBadge :checked="isCardChecked" />
      <text class="text-24rpx font-bold">{{ title }}</text>
    </view>
    <wd-collapse v-model="collapsedList">
      <template v-for="item in data" :key="item.title">
        <CollapseItem
          v-if="item.children && item.children.length > 0"
          :title="item.title"
          :name="item.title"
          :expandedList="collapsedList"
          :checked="isCollapseChecked(item)"
        >
          <wd-cell-group border>
            <template v-for="child in item.children" :key="child.title">
              <CellItem
                v-if="!child.children || child.children.length === 0"
                :title="child.title"
                :checked="child.checked"
                @click="handleItemClick(child.name ?? '', child)"
              />
              <CollapseItem
                v-else
                :title="child.title"
                :name="child.title"
                :expandedList="collapsedList"
                :checked="isCollapseChecked(child)"
              >
                <wd-cell-group border>
                  <template v-for="grandChild in child.children" :key="grandChild.name">
                    <CellItem
                      :title="grandChild.title"
                      :checked="grandChild.checked"
                      @click="handleItemClick(grandChild.name ?? '', grandChild)"
                    />
                  </template>
                </wd-cell-group>
              </CollapseItem>
            </template>
          </wd-cell-group>
        </CollapseItem>
        <CellItem
          v-else
          :title="item.title"
          :class="{ checked: item.checked }"
          @click="handleItemClick(item.name ?? '', item)"
          :checked="item.checked"
        />
      </template>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface IProps {
  title: string
  checked?: boolean
  data?: Application.IItem[]
}

const props = withDefaults(defineProps<IProps>(), {
  data: () => []
})

// 折叠状态
const collapsedList = ref<string[]>([])
// 卡片是否选中
const isCardChecked = ref(false)

// 监听数据变化，更新折叠状态
watch(
  () => props.data,
  (newData) => {
    // 默认展开所有折叠项
    collapsedList.value = newData.map((item) => item.title)
    isCardChecked.value = newData.every((item) => item.checked)
  },
  { deep: true, immediate: true }
)

// 判断折叠项是否选中
const isCollapseChecked = (collapseItem: Application.IItem): boolean => {
  if (collapseItem.children && collapseItem.children.length > 0) {
    return collapseItem.children.every((item) => isCollapseChecked(item))
  }
  return collapseItem.checked ?? false
}

const emit = defineEmits(['item-click'])

const handleItemClick = (name: string, item: Application.IItem) => {
  emit('item-click', name, item)
}
</script>

<style scoped lang="scss">
.collapse {
  :deep() {
    .no-border {
      &::after {
        display: none;
      }
    }
  }
}
</style>
