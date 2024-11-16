import { Modal } from 'antd';
import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';
import withFunctionalCall from '../../hocs/withFunctionalCall';
 
const QrCodeScanner = ({ visible, onCancel, onOk }) => {
  const [data, setData] = useState(null);
 
  const handleScan = (result) => {
    if (result) {
      setData(result);
    }
  };
 
  const handleError = (err) => {
    console.error(err);
  };
 
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <QrReader
        onResult={(result, error) => {
          const text = result?.text;
          if (text) {
            setData(text);
            console.log(text, 'result?.tex')
            onOk?.(text);
            onCancel();
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      {data && <p>扫描结果: {data}</p>}
    </Modal>
  );
};
 
export default withFunctionalCall(QrCodeScanner);