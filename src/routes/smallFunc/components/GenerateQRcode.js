import { Input, QRCode, Space, Button } from 'antd';
import React from 'react';

const GenerateQRcode = () => {
  const [text, setText] = React.useState('https://ant.design/');

  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Space direction="vertical" align="center">
      <div id="myqrcode">
        <QRCode value={text || '-'} />
      </div>
      <Input
        placeholder="-"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="primary" onClick={() => downloadQRCode()}>
        Download
      </Button>

    </Space>
  );
};

export default GenerateQRcode;
