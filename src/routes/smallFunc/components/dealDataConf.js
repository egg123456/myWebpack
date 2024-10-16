
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

export default {
  handleDelHtmlTag,
  previewHtml,
  trim,
  JSONFormat,
  filterHtmlTag,
  filterSpace,
  filterReturn
};
