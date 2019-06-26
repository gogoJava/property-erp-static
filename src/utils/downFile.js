// 下载文件
export const downloadFile = (url) => {
  const el = document.createElement('a')
  document.body.appendChild(el)
  el.href = url // url 下载连接
  el.download = url // 没有download属性浏览器可能会拦截
  el.target = '_new' // 指定在新窗口打开
  el.click()
  document.body.removeChild(el)
}
