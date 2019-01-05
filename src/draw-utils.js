// 绘图用的工具类

/**
 * 基于三角形相似的原理，按照指定曲度生成二次贝塞尔曲线的相对路径
 * @param {Array(2)} p1 
 * @param {Array(2)} p2 
 * @param {Number} curveness 任意数字，建议使用[-1,1]区间的数字
 */
function getCurvePath(p1, p2, curveness) {
  let cp = [
    (p1[0] + p2[0]) / 2 - (p2[1] - p1[1]) * curveness,
    (p1[1] + p2[1]) / 2 + (p2[0] - p1[0]) * curveness
  ]
  return `m${p1[0]},${p1[1]} q${cp[0]},${cp[1]} ${p2[0]},${p2[1]}`
}