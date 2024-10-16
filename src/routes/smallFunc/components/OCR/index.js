import React, { useState} from 'react';
import tesseract from 'tesseract.js';
import './index.less';
import { Button, Upload, message } from 'antd';

function OCR() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }

  const handleClick = () => {

    tesseract.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png',
      'eng', // eng+chi_tra
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      // Get Confidence score
      let confidence = result.confidence

      let text = result.text
      setText(text);

    })
  }

  return (
    <div className="OCR">
      {/* <main className="OCR-main">
        <h3>Actual imagePath uploaded</h3>
        <img width={'100%'}
           src={imagePath} className="OCR-image" alt="logo"/>

          <h3>Extracted text</h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick} style={{height:50}}> convert to text</button>
      </main> */}
      <Upload 
        action={'/build/api/upload'}
        data={{ isOCR: true }}
        onChange={(info) => {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
      >
        <Button>upload</Button> 
      </Upload>
    </div>
  );
}

export default OCR
