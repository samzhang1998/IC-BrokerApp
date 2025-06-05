<script setup lang="ts">
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/hooks/useUser'
const { token, roles } = useUser()
const { langStatus } = useLocale()

onMounted(() => {})

onShow(() => {})

const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})
</script>

<template>
  <view class="common-bg home">
    <NavBar v-bind="navBar">
      <template #content>
        <view class="bar-title act">Product</view>
      </template>
      <template #right> </template>
    </NavBar>

    <!-- <NoData v-if="productAll.length <= 0"></NoData> -->

    <TabBar></TabBar>
  </view>
</template>

<style lang="scss" scoped></style>
