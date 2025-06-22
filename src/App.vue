<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
import { useSystem } from '@/hooks/useSystem'

const { setNavBarHeight, pushMessage } = useSystem()
const { setUserInfo } = useUser()

onLaunch(() => {
  console.log('App Launch')

  //初始化navbar
  setNavBarHeight()

  //设置用户信息
  const info: IUserState = uni.getStorageSync('userInfo')
  console.log('info', info)
  setUserInfo(info)

  //监听推送消息
  pushMessage()
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import url('./style/common.scss');
@import url('./style/wot.scss');
</style>
