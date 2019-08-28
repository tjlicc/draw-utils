
/**
 * 对过长的字符串进行截断处理
 * @param {String} str 原始字符串
 * @param {Number} targetLength 要显示的字符串长度
 */
export function ellipsis(str, targetLength) {
  let result = str
  if (str.length > targetLength) {
    result = str.substring(0, targetLength - 2) + '...'
  }
  return result
}