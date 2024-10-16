import { Table, Tag } from 'antd';
import React from 'react';
import './index.less';
import dayjs from 'dayjs';
import cls from 'classnames';
import { LinkOutlined } from '@ant-design/icons';

const second = 1000;
const hours = 60 * 60 * second;
const day = 24 * hours;

const colorMap = {
  'dev': '#87d068',
  'coordinate': '#2db7f5',
  'extra': '#f50',
}

const obtainTime = (item, tempTime) => {
  const startTime = dayjs(item.beginTime).valueOf();
  const endTime = dayjs(item.endTime).valueOf();
  return startTime <= tempTime && endTime > tempTime;
}

const getTagList = ({ eventTimeList = [], currTime }) => {
  const baseHeight = 22;
  const tagStyle = { width: '12.5%', height: baseHeight, marginRight: 0, padding: 0 };
  const arr = new Array(9);
  const startTimeOfDay = currTime + (9 * hours);
  const sleepTime = currTime + (12 * hours);
  let usedTimeLength = 0;
  for (var i = 0; i < arr.length; i++) {
    const tempTime = startTimeOfDay + hours * i;
    if (i === 3) {
      continue;
    }
    const task = eventTimeList.find(item => {
      const startTime = dayjs(item.beginTime).valueOf();
      const endTime = dayjs(item.endTime).valueOf();
      return startTime <= tempTime && endTime > tempTime;
    })
    if (task) {
      const hasSleep = obtainTime(task, sleepTime);
      const endOfWorkDay = currTime + (18 * hours);
      const endVal = dayjs(task.endTime).valueOf();
      const startTime = dayjs(task.beginTime).valueOf();
      const tagLength = ((endVal >= endOfWorkDay ? endOfWorkDay : endVal) - (startTime < startTimeOfDay ? startTimeOfDay : startTime)) / hours - (hasSleep ? 1 : 0);
      // console.log(tagLength, 'tagLength', i)
      i += tagLength - (endVal >= endOfWorkDay && startTime <= sleepTime ? 0 : 1);
      usedTimeLength += tagLength;
      console.log(task.name, task.implementor, tagLength, 'tagLengths')
      arr[i] = (
        <Tag 
          style={{ ...tagStyle, width: `${12.5 * tagLength}%` }} 
          color={colorMap[task.timeType]} 
          title={task.name}
          // onClick={() => task.link && window.open(task.link) }
        >
          {task.link ? <LinkOutlined style={{ color: 'blue', paddingRight: 5 }} onClick={() => task.link && window.open(task.link) }/> : null}
          {tagLength > 2 ? task.implementor : ''}
        </Tag>
      );
    } else {
      arr[i] = <Tag style={tagStyle} color="#fff" />
    }
  }
  return [arr, usedTimeLength];
}

const renderCell = (val, { eventTimeList = [] }, index, currTime) => {
  const eventTimeListOfDemand = eventTimeList.filter(el => ['dev', 'coordinate'].includes(el.timeType));
  const eventTimeListOfExtra = eventTimeList.filter(el => ['extra'].includes(el.timeType))
  const [demandTags, demandUsedTags] = getTagList({ eventTimeList: eventTimeListOfDemand, currTime });
  const [extraTags, extraUsedTags] = getTagList({ eventTimeList: eventTimeListOfExtra, currTime });
  return [
    ...(demandUsedTags ? demandTags : []),
    ...(extraUsedTags ? extraTags : []),
  ];
}

const weekday = ['日', '一', '二', '三', '四', '五', '六'];

const renderColumns = (time = dayjs().startOf('M').valueOf()) => {
  const current = dayjs(dayjs(time).startOf('M').format('YYYY-MM-DD')).valueOf();
  const arr = new Array(31);
  for (let i = 0; i < arr.length; i++) {
    const temp = current + day * i;
    const dayOfWeek = weekday[dayjs(temp).day()];
    const isRestDay = [weekday[0], weekday[6]].includes(dayOfWeek);
    arr[i] = {
      title: (
        <>
          <div>{`${dayjs(temp).format('MM-DD')}`}</div>
          <div>{`(${dayOfWeek})`}</div>
        </>
      ),
      dataIndex: 'day' + i,
      className: `dateColumn${isRestDay ? ' isRestDay' : ''}`,
      width: 100,
      render: (val, record, index) => {
        // const restDayContent = '---------------';
        return renderCell(val, record, index, temp);
      }
    };
  }
  return arr;
}

const getData = () => {
  let i = 4;
  const arr = [];
  while(i) {
    arr.push({
      key: 31 - i,
      name: 'Jim Green'.slice(0, Math.random() * 9 + 1),
      age: 40,
      address: 'London Park',
      workList: [
        { id: 1, name: 'one', type: 'dev', startTime: 1689033600000, endTime: 1689037200000 },
        { id: 2, name: 'two', type: 'coordinate', startTime: 1689037200000 + hours * (i % 8), endTime: 1689040800000 + hours * (i % 8) },
      ]
    })
    i--;
  }
  return arr;
}

const ProjectProcess = ({ data, month, className }) => {
  const columns = [
    { title: 'belongToVersion', width: 150, dataIndex: 'planName', key: 'planName', fixed: 'left' },
    { title: 'name', width: 200, dataIndex: 'name', key: 'name', fixed: 'left', 
      render: val => <div className="omit" title={val}>{val}</div> 
    },
    ...renderColumns(month),
  ];
  return (
    <Table
      className={cls('ProjectProcess', className)}
      rowKey="id"
      columns={columns}
      dataSource={data}
      scroll={{ x: 1300, y: 400 }}
      showAll
      pagination={false}
    />
  )
}

export default ProjectProcess;

/**
select plan.name as planName, event.* from event,plan where event.id = 39;
select plan.name as planName, plan.id as planId, event.* from event left join plan on event.belongToVersion=plan.id where event.id = 39;


 */
// select plan.name as planName, event.* from plan right join event on event.belongToVersion=plan.id where event.id = 39;