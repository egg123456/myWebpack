import React, { useContext } from 'react';
import List from '../../components/List';
import { deletePlanApi, fetchPlanList } from './services/plan';
import { getCustomItem, getColumns } from './config/planList';
import { Button, message } from 'antd';
import EditPlanModal from './components/EditPlanModal';
import { toDayJs } from '../../utils/FormatUtils';
import GlobalContext from '../../common/GlobalContext';

const PlanList = () => {
  const [listData, setListData] = React.useState({});
  const [searchParams, setSearchParams] = React.useState({});
  const globalContext = useContext(GlobalContext);
  const handleSearch = (params) => {
    fetchPlanList(params).then(res => {
      console.log(res, 'res')
      setListData({ data: res.result.data, total: res.result.total });
      setSearchParams(params);
    })
  }
  const handleAddClick = () => {
    console.log(globalContext, 'globalContext', globalContext?.globalContextVal?.name)
    EditPlanModal.show({ record: { implementor: globalContext?.globalContextVal?.name }, onOk: () => { handleSearch(searchParams) } });
  }

  const handleEditClick = (record) => {
    const { submitTest, publishTime, publishedEnv = '[]' } = record;
    const obj = { ...record, submitTest: toDayJs(submitTest), publishTime: toDayJs(publishTime), publishedEnv: JSON.parse(publishedEnv) }
    EditPlanModal.show({ record: obj, operateType: 'edit', onOk: () => { handleSearch(searchParams) }});
  }

  const handleDeleteClick = (record) => {
    deletePlanApi(record).then(() => {
      message.info('删除成功');
    });
  }

  return (
    <>
    <div><Button onClick={handleAddClick}>add</Button></div>
    <List 
      customItem={getCustomItem()}
      table={{
        columns: getColumns({ handleEditClick, handleDeleteClick }),
        dataSource: listData.data,
        rowKey: 'id',
        pagination: {
          total: listData.total,
        }
      }}
      onSearch={handleSearch} 
    />
    </>
  );
}

export default PlanList;
