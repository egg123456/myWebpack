import React, { useContext, useEffect } from 'react';
import List from '../../components/List';
import { addApi, deleteApi, fetchList } from './services';
import { getCustomItem, getColumns } from './config/index';
import { Button, message, Space } from 'antd';
import EditModal from './components/EditModal';
import { toDayJs } from '../../utils/FormatUtils';
import GlobalContext from '../../common/GlobalContext';
import QrCodeScanner from '../../components/QrCodeScanner';
import useRowSelect from './hooks';
import { CSVLink } from 'react-csv';

const headers = [
  { label: '备注', key: 'remark' },
  { label: '发票代码', key: 'code' },
  { label: '发票号码', key: 'num' },
  { label: '发票日期', key: 'date' },
  { label: '校验码', key: 'checkNum' },
  { label: '金额', key: 'money' },
];

const InvoiceList = () => {
  const [listData, setListData] = React.useState({});
  const [searchParams, setSearchParams] = React.useState({});
  const globalContext = useContext(GlobalContext);
  const { rows, handleSelectChange } = useRowSelect();
  const handleSearch = (params) => {
    fetchList(params).then(res => {
      console.log(res, 'res')
      setListData({ data: res.result.data, total: res.result.total });
      setSearchParams(params);
    })
  }

  const handleAddClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // 请求摄像头权限
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
             // EditModal.show({ record: { }, onOk: () => { handleSearch(searchParams) } });
    QrCodeScanner.show({
      onOk: (str) => {
        const data = str.split(',');
        console.log(data, 'da')
        const payload = {
          code: data[2],
          num: data[3],
          date: data[5],
          money: data[4],
          checkNum: data[6],
        };
        addApi(payload).then(() => {
          handleSearch({});
        })
      } 
    })
          })
          .catch(function(error) {
              // 处理错误，用户可能拒绝了访问请求或设备不支持
              console.error("获取摄像头权限失败:", error);
          });
  } else {
      alert("你的浏览器不支持getUserMedia API");
  }

  }

  const handleEditClick = (record) => {
    const { startTime, endTime } = record;
    const obj = { ...record, startTime: toDayJs(startTime), endTime: toDayJs(endTime) }
    EditModal.show({ record: obj, operateType: 'edit', onOk: () => { handleSearch(searchParams) }});
  }

  const handleDeleteClick = (record) => {
    deleteApi(record).then(() => {
      message.info('删除成功');
      handleSearch({});
    });
  }

  useEffect(() => {
    handleSearch({})
  }, [])

  return (
    <>
    <Space>
      <Button onClick={handleAddClick}>add</Button>
      <CSVLink data={rows} headers={headers}>
        <Button type="primary" disabled={!rows.length}>export</Button>
      </CSVLink>
    </Space>
    <List 
      customItem={getCustomItem()}
      table={{
        columns: getColumns({ handleEditClick, handleDeleteClick }),
        dataSource: listData.data,
        rowKey: 'id',
        pagination: {
          total: listData.total,
        },
        rowSelection: {
          selectedRowKeys: rows.map(item => item.id),
          onChange: handleSelectChange,
        }
      }}
      onSearch={handleSearch} 
    />
    </>
  );
}

export default InvoiceList;
