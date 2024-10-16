/**
 * @description: 获取RMB零
 * @param {*} integer - 整数
 * @param {*} i - 当前位置
 * @return {*}
 */
const getChineseZero = (integer, i) => {
  let ans = '';
  const pos = integer.length - i - 1;
  let restPos = pos % 4;
  if (restPos !== 0) {
    while(restPos) {
      i++;
      const num = integer.charAt(i)
      if (num !== '0') {
        ans = '零';
        i--;
        break;
      }
      restPos--;
      i--;
    }
  }
  return ans;
}

/**
 * @description: RMB upperCase
 * @param {*} val
 * @return {string}
 */
export const getAmountChinese = (val) => {
  const amount = +val
  if (Number.isNaN(amount) || amount < 0) return ''
  const NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const N_UNIT1 = ['', '拾', '佰', '仟']
  const N_UNIT2 = ['', '万', '亿']
  const D_UNIT = ['角', '分', '厘', '毫']
  let [integer, decimal] = amount.toString().split('.')
  if (integer && integer.length > 12) return '金额过大无法计算'
  let res = ''
  if (Number(amount) === 0) {
    return "零元";
  }
  // 整数部分
  if (integer && Number(integer) !== 0) {
    for (var i = 0, len = integer.length; i < len; i++) {
      const num = integer.charAt(i)
      const pos = len - i - 1 // 排除个位后 所处的索引位置
      if (num === '0') { // 当前位 等于 0
        res += getChineseZero(integer, i);
      } else {
        res += NUMBER[num]
      }
      if (parseInt(num)) res += N_UNIT1[(pos) % 4]
      if (pos % 4 === 0) res += N_UNIT2[Math.floor(pos / 4)]
    }
    res += '元'
  }
  // 小数部分
  if (parseInt(decimal)) {
    for (let i = 0; i < 4; i++) {
      const num = decimal.charAt(i)
      if (parseInt(num)) res += NUMBER[num] + D_UNIT[i]
    }
  } else {
    res += '整'
  }
  return res
}

const testData = [
  0.00,
  0.05,
  0.35,
  1.00,
  1.05,
  1.35,
  10.05,
  10.35,
  108000,
  100800,
  123456,
  1080009000,
  1008009000,
  1234567890.12,
]

testData.forEach(val => {
  console.log(val, getAmountChinese(val));
})