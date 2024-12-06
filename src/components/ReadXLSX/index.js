import { Modal, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import withFunctionalCall from '../../hocs/withFunctionalCall';
import * as XLSX from 'xlsx';
 
const ReadXLSX = ({ visible, onCancel, onOk }) => {
  const [data, setData] = useState(null);
  const inpRef = useRef();
 
  const handleScan = (result) => {
    if (result) {
      setData(result);
    }
  };
 
  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    function call(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workBook = XLSX.read(data, { type: "array" });

        const firstSheetName = workBook.SheetNames[0];

        const firstSheetContent =  workBook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(firstSheetContent, { header: 1 });

        const htmlData= XLSX.utils.sheet_to_html(firstSheetContent, { header: 'my data' });

        console.log(data, firstSheetContent['!cols'], jsonData, htmlData)

        setData(jsonData)

      }
      reader.readAsArrayBuffer(file);
    }
    inpRef.current.addEventListener('change', call)
  }, [])
 
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <input ref={inpRef} type="file" />

      {!data ? null :
        <Table
          columns={data[0]?.map?.((item, idx) => {
            return {
              title: item,
              dataIndex: idx,
              // render: (val, row) => {
              //   console.log(row, 'row')
              //   return row[idx];
              // }
            }
          }) || []}
          dataSource={data.slice(1)}
          pagination={false}
        />
      }


      {/* {data && <p>扫描结果: {data}</p>} */}
      {/* {data && <p dangerouslySetInnerHTML={{ __html: data }}></p>} */}
    </Modal>
  );
};
 
export default withFunctionalCall(ReadXLSX);