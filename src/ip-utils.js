function createUtils() {

  const ipSeg = '(?:\\d|(?:[1-9]\\d)|(?:1\\d{2})|(?:2[0-4]\\d)|(?:25[0-5]))'

  const maskReg = new RegExp('(\\d|[1-2]\\d|3[0-2])')
  const ipReg = new RegExp(`((?:${ipSeg}\\.){3}${ipSeg})`)
  const cidrReg = new RegExp(`^${ipReg.source}/${maskReg.source}$`)

  function _ip2Binary(ipStr) {
    let numbers = ipStr.split('.')
    let binaryStr = ''
    for (let number of numbers) {
      let temp = parseInt(number).toString(2)
      binaryStr += temp.padStart(8, '0')
    }
    return binaryStr
  }
  function _binary2ip(binaryStr) {
    let str1 = binaryStr.substring(0, 8)
    let str2 = binaryStr.substring(8, 16)
    let str3 = binaryStr.substring(16, 24)
    let str4 = binaryStr.substring(24, 32)

    let number1 = parseInt(str1, 2)
    let number2 = parseInt(str2, 2)
    let number3 = parseInt(str3, 2)
    let number4 = parseInt(str4, 2)
    return [number1, number2, number3, number4].join('.')
  }

  function _maskCount2Binary(maskCountStr) {
    let maskCount = parseInt(maskCountStr)
    let binaryStr = new Array(maskCount).fill('1').join('')
    return binaryStr.padEnd(32, '0')
  }

  return {
    /**
     * 判断一个字符串是否为点分十进制格式的IP地址
     * @param {String} str 
     * @returns {Boolean}
     */
    isIP(str) {
      return ipReg.test(str)
    },

    /**
     * 将CIDR格式的网段解析成起止IP地址，包含网络地址和广播地址
     * @param {String} str 格式形如192.168.0.1/8
     * @returns {Array} 起止IP地址
     */
    parseCidr(str) {
      let matchResult = str.match(cidrReg)
      if (!matchResult) {
        throw new Error(`unrecognized network segment: ${str}`)
      } else {
        let ip = matchResult[1]
        let maskCountStr = matchResult[2]

        let ipBinaryArr = _ip2Binary(ip).split('')
        let maskBinaryArr = _maskCount2Binary(maskCountStr).split('')

        let startIpBinary = ''
        for (let idx = 0; idx < 32; idx++) {
          startIpBinary += parseInt(ipBinaryArr[idx]) & parseInt(maskBinaryArr[idx]) + ''
        }
        let endIpBinary = startIpBinary.substring(0, parseInt(maskCountStr)).padEnd(32, '1')
        return [_binary2ip(startIpBinary), _binary2ip(endIpBinary)]
      }
    }
  }
}

export const IPUtils = createUtils()