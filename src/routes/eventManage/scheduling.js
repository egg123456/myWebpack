import React, { useEffect, useState } from 'react';
import ProjectProcess from '../../components/ProjectProcess';
import { fetchEventTimeList } from './services';
import { DatePicker, TreeSelect } from 'antd';
import dayjs from 'dayjs';
import { dateTimeFormat } from '../../utils/FormatUtils';
import ProjectSchedule from '../projectSchedule';
import { getCurrBranchMember, memberStructure } from './config/scheduling';

const defaultSearchParams = {
  month: dayjs().startOf('M').format(dateTimeFormat),
}

const Scheduling = () => {
  const [listData, setListData] = React.useState({});
  const [searchParams, setSearchParams] = useState(defaultSearchParams);

  const handleSearch = (params = defaultSearchParams) => {
    fetchEventTimeList(params).then(res => {
      setListData({ data: res.result.data, total: res.result.total });
      setSearchParams(params);
    })
  }

  useEffect(() => {
    handleSearch();
  }, [])

  const handleMonthChange = (v) => {
    const params = { ...searchParams, month: v.format('YYYY-MM-DD') };
    setSearchParams(params);
    handleSearch(params)
  }

  const handleMemberChange = (v) => {    
    const params = { ...searchParams, members: getCurrBranchMember(v) };
    setSearchParams(params);
    handleSearch(params)
  }

  const integerData = (arr = []) => {
    const list = []
    arr.forEach((item) => {
      const { id, eventTimeList = [], ...rest } = item;
      list.push(...eventTimeList.map(el => ({ ...rest, ...el, eventId: id})))
    })
    const ans = [{ id: 10000, name: 'jihe', eventTimeList: list }];
    return ans;
  }

  return (
    <>
      <DatePicker.MonthPicker onChange={handleMonthChange} />
      <TreeSelect
        style={{ width: 300 }}
        // value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={memberStructure}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={handleMemberChange}
      />
      <ProjectProcess data={listData.data || []} month={searchParams.month}/>
      <h3>集成模式</h3>
      <ProjectProcess data={integerData(listData.data || [])} month={searchParams.month} className="integerMode"/>
      <h3>日历</h3>
      {/* <Calendar cellRender={cellRender} /> */}
      <ProjectSchedule data={listData.data || []} month={searchParams.month}/> 
    </>
  );
};

export default Scheduling;
