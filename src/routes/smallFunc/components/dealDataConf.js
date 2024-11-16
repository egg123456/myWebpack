import * as vlq from 'vlq';
import * as sourceMap from 'source-map';


/**
 * @description: del html tag
 * @param {*} str
 * @return {*}
 */
export const handleDelHtmlTag = (str) => {
  let title = str.replace(/<\/((div)|(p)|(ul)|(li))>/g,"\r"); // 行标签换行
  title = title.replace(/<[^>]+>/g,"");//去掉所有的html标记
  console.log(title, 'sda');
  const reg = /(\r){2,}/g;
  title = title.replace(reg, '\r');
  return title;
}

export const previewHtml = (str) => {
  let htmlPreview = document.querySelector('#htmlPreview');
  if (htmlPreview) {
    htmlPreview.innerHTML = str;
    return;
  } 
  htmlPreview = document.createElement('div');
  htmlPreview.id = 'htmlPreview';
  htmlPreview.innerHTML = str;
  document.body.appendChild(htmlPreview);
  return '请看下面'
}

export const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

export const filterSpace = (str) => {
  return str.replace(/\ +/g, "");
}

export const filterReturn = (str) => {
  return str.replace(/[\r\n]/g, "");
}

export const JSONFormat = (str) => {
  let result = '';
  try {
    result = JSON.stringify(JSON.parse(str), null, 4);
  } catch (error) {
    alert('数据格式错误')
  }
  return result;
}

export const filterHtmlTag = (str) => {
  var reg = /<[^>]+>/ig;
  return str.replace(reg, '');
}

export const toVLQ = (str) => {
  let encoded = vlq.encode(Number(str));
  console.log(str, encoded, 'toVLQ')
  return encoded;
  // console.log('Encoded VLQ:', encoded); // 输出编码后的VLQ值
  // let decoded = vlq.decode(encoded);
  // console.log('Decoded Number:', decoded); // 输出解码后的原始数字‌:ml-citation{ref="1" data="citationList"}  
}

export const vlqToNum = (str) => {
  let encoded = vlq.decode(str);
  console.log(str, encoded, 'vlqToNum')
  return encoded;
  // console.log('Encoded VLQ:', encoded); // 输出编码后的VLQ值
  // let decoded = vlq.decode(encoded);
  // console.log('Decoded Number:', decoded); // 输出解码后的原始数字‌:ml-citation{ref="1" data="citationList"}  
}

export const resolveMappings = (mappings) => {
 
  // 创建一个新的SourceMapConsumer实例
  const consumer = new sourceMap.SourceMapConsumer(mappings);
  
  // 要查找的生成代码中的位置（比如第5个字符）
  const generatedPosition = {
    line: 0,
    column: 5
  };
 
  // 将生成代码中的位置转换为原始代码中的位置
  const originalPosition = consumer.originalPositionFor(generatedPosition);
  
  console.log(originalPosition); // 输出原始代码中的位置信息
  
  // 记得在完成后释放SourceMapConsumer实例
  consumer.destroy();

  return originalPosition;
}


export default {
  handleDelHtmlTag,
  previewHtml,
  trim,
  JSONFormat,
  filterHtmlTag,
  filterSpace,
  filterReturn,
  toVLQ,
  vlqToNum,
  resolveMappings,
};
