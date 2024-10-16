import React from 'react';
import List from '../../components/List';
import { fetchCeremonyRecord } from './services';
import { getCustomItem, columns } from './config';

const Ceremony = () => {
  const [listData, setListData] = React.useState({});
  const handleSearch = (params) => {
    fetchCeremonyRecord(params).then(res => {
      console.log(res)
      setListData({ data: res.data.result });
    })
  }
  return (
    <List 
      customItem={getCustomItem()}
      table={{
        columns,
        dataSource: listData.data,
      }}
      onSearch={handleSearch} 
    />
  );
}

export default Ceremony;
