/**
 * 需要将rgb三种色值转为0-255之间的整数
 * @param {*} r 
 * @param {*} g 
 * @param {*} b 
 */
export function rgb2hsl(r, g, b) {
  let r$ = r / 255
  let g$ = g / 255
  let b$ = b / 255

  let max = Math.max(r$, g$, b$)
  let min = Math.min(r$, g$, b$)
  let delta = max - min

  // compute h value
  let h = 0
  switch (max) {
    case min:
      h = 0
      break
    case r$:
      h = 60 * (((g$ - b$) / delta) % 6)
      break
    case g$:
      h = 60 * (((b$ - r$) / delta) + 2)
      break
    case b$:
      h = 60 * (((r$ - g$) / delta) + 4)
      break
    default:
      h = 0
      break
  }

  // compute l value
  let l = (max + min) / 2

  // compute s value
  let s = 0
  if (max != min) {
    s = delta / (1 - Math.abs(2 * l - 1))
  }

  return `hsl(${h}, ${s.toFixed(3) * 100}%, ${l.toFixed(3) * 100}%)`
}

/**
 * 
 * @param {Number} h 
 * @param {String} s 带百分号
 * @param {String} l 带百分号
 */
export function hsl2rgb(h, s, l) {
  s = +s.replace('%', '') / 100
  l = +l.replace('%', '') / 100

  let c = (1 - Math.abs(2 * l - 1)) * s
  let x = c * (1 - Math.abs((h / 60) % 2 - 1))
  let m = l - c / 2

  let r$ = 0
  let g$ = 0
  let b$ = 0
  if (h >= 0 && h < 60) {
    r$ = c
    g$ = x
    b$ = 0
  } else if (h >= 60 && h < 120) {
    r$ = x
    g$ = c
    b$ = 0
  } else if (h >= 120 && h < 180) {
    r$ = 0
    g$ = c
    b$ = x
  } else if (h >= 180 && h < 240) {
    r$ = 0
    g$ = x
    b$ = c
  } else if (h >= 240 && h < 300) {
    r$ = x
    g$ = 0
    b$ = c
  } else if (h >= 300 && h < 360) {
    r$ = c
    g$ = 0
    b$ = x
  }

  let r = (r$ + m) * 255
  let g = (g$ + m) * 255
  let b = (b$ + m) * 255
  return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
}
