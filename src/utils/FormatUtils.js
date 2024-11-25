import dayjs from 'dayjs';

export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

export const FormatDateTime = (val, defaultVal = '-') => {
  if (!val) {
    return defaultVal;
  }
  return dayjs(val).format(dateTimeFormat);
};

export const toDayJs = (val) => {
  if (!val) return undefined;
  return dayjs(val);
}


export const dealDateTimeToDayjs = (data) => {
  const obj = data;
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      dealDateTimeToDayjs(item);
    })
  } else if (typeof obj === 'object') {
    // 格式化时间
    Object.keys(obj).forEach(key => {
      const currVal = obj[key];
      console.log(currVal, key, 'key')
      if (Array.isArray(currVal)) {
        currVal.forEach((item) => {
          dealDateTimeToDayjs(item);
        })
      } else if (typeof currVal === 'object') {
        dealDateTimeToDayjs(currVal);
      } else {
        if (/^\d{4}-\d{2}-\d{2}/.test(obj[key])) {
          obj[key] = toDayJs(obj[key])
          // obj[key] = dayjs(obj[key]).valueOf();
        }
      }
    })
  }
  console.log(obj, 'dealDateTimeToDayjsb');
  return obj;
};
