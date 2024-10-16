import axios from 'axios';
import { message } from 'antd';
import docCookies from './docCookies';

// interface IRes {
//   success?: boolean,
//   data?: any,
//   result?: any,
//   error?: any
// }

const initialConfig = {
  onError: (err) => {
    const { response: { status, data } = {} } = err;
    console.log(status, 'statusstatusstatus', err)
    if (status === 401) {
      localStorage.setItem('xxx_skipUrl', location.href);
      location.href = '/view/login';
      return;
    }
    (data?.message || err.error) && message.error(data?.message || err.error);
  },
};

const hecateRequest = (url, axOption = {}, usrOption = initialConfig) => {
  const option = {
    ...axOption,
    ...usrOption,
    params: {
      ...(axOption.params || {}),
      timestamp: new Date().getTime(),
    }
  };

  const errorCheck = typeof option.onError === 'function';


  return new Promise((resolve, reject) => {
    console.log(docCookies.getItem('token'))
    axios({ 
      url, 
      ...option,
      headers: {
        Authorization: 'Bearer ' + (docCookies.getItem('token'))
      }
    })
      .then((res) => {
        if (res && res.success === false) {
          errorCheck && option.onError(res);
        }
        resolve(res.data);
      })
      .catch((err) => {
        errorCheck && option.onError(err);
        reject(err);
      });
  });
};

export default hecateRequest;