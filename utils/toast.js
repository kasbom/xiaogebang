const toast = msg => {
  uni.showToast({
    title: msg,
    icon: 'none',
    mask: true
  })
}

export default toast