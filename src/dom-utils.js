// DOM操作相关的工具类

// 内部方法，不对外开放
let I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('')

function _hash(input) {
  let hash = 5381;
  let i = input.length - 1;

  if (typeof input == 'string') {
    for (; i > -1; i--)
      hash += (hash << 5) + input.charCodeAt(i);
  }
  else {
    for (; i > -1; i--)
      hash += (hash << 5) + input[i];
  }
  let value = hash & 0x7FFFFFFF;

  let retValue = '';
  do {
    retValue += I64BIT_TABLE[value & 0x3F];
  }
  while (value >>= 6);

  return retValue;
}

/**
 * 选中输入框
 * @param {HTMLElement} ele 输入框DOM元素
 */
export function selectInput(ele) {
  ele.focus()

  let selection = window.getSelection()
  let range = document.createRange()
  range.selectNodeContents(ele)
  selection.removeAllRanges()
  selection.addRange(range)
}

/**
 * 设置页面的标题
 * @param {String} title 页面标题
 */
export function setPageTitle(title) {
  let titleDom = document.querySelector('html > head > title')
  if (title) {
    titleDom.textContent = `${title}`
  }
}

/**
 * 显示提示
 * @param {Array} offset 提示框要显示的位置,[x, y]
 * @param {content} content 要提示的内容
 */
export function showTooltip(offset, content) {
  let domId = _hash(content)
  if ($(`#${domId}`).length == 0) {
    let html = `<div id="${domId}" style="position: absolute; left: ${offset[0]}px; top: ${offset[1] - 6}px; z-index: 2018;">
                  <div style="position: absolute; width: 200px; bottom: 100%; left: -100px; background: #303133; color: #fff; opacity: .8; border-radius: 4px; padding: 10px; font-size: 12px;">${content}</div>
                  <div style="width: 0; height: 0; border-color: transparent; border-style: solid; border-width: 6px;border-top-color: #303133; opacity: .8"></div>
                </div>`
    $('html > body').append(html)
  } else {
    $(`#${domId}`).css({
      left: offset[0],
      top: offset[1]
    })
  }
}

/**
 * 根据内容关闭提示
 * @param {content} content 提示的内容
 */
export function closeTooltip(content) {
  let domId = _hash(content)
  $(`#${domId}`).remove()
}

export function unescape(text) {
  if (text) {
    return text.replace(/&amp;|&#38;/g, '&')
      .replace(/&lt;|&#60;/g, '<')
      .replace(/&gt;|&#62;/g, '>')
      .replace(/&quot;|&#34;/g, '"')
      .replace(/&#39;/g, '\'')
  } else {
    return text
  }
}