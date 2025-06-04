let loadingCount = 0

/**
 * @description 显示loading
 * @return {*}
 */
export function showLoading() {
  uni.showLoading({
    title: 'Loading...',
    mask: true
  })
  loadingCount = loadingCount + 1
}

/**
 * @description 隐藏loading
 * @return {*}
 */
export function hideLoading() {
  loadingCount = loadingCount - 1
  if (loadingCount === 0) {
    uni.hideLoading()
    return function (msg: string) {
      uni.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    }
  } else {
    return () => {}
  }
}
