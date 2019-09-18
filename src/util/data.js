// 获取日期
export const getPreviousDate = (num = 0) => {
  var data = new Date()
  data.setTime(data.getTime() - 24 * 60 * 60 * 1000 * num)
  var time = data.getFullYear() + '-' + (data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1) + '-' + (data.getDate() < 10 ? '0' + (data.getDate()) : data.getDate()) + '\xa0' + '00:00:00'
  return time
}

// 加密
export const compileStr = (code) => {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}
// 字符串进行解密
export const uncompileStr = (code) => {
  code = unescape(code)
  var c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}
