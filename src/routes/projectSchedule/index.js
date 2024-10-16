import React from 'react';
import { Badge, Calendar, Alert, Tag } from 'antd';
import './index.css';
import { toDayJs } from '../../utils/FormatUtils';
import dayjs from 'dayjs';

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
  const tagStyle = { width: '12.5%', height: baseHeight, marginRight: 0, padding: 0, overflow: 'hidden', verticalAlign: 'bottom' };
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
      i += tagLength - (endVal >= endOfWorkDay && startTime <= sleepTime ? 0 : 1);
      usedTimeLength += tagLength;
      arr[i] =  (
        <Tag 
          style={{ ...tagStyle, width: `${12.5 * tagLength}%` }} 
          color={colorMap[task.timeType]} 
          title={task.name}
          onClick={() => task.link && window.open(task.link) }
        >
          {tagLength > 2 ? task.name : ''}
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

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const ProjectSchedule = ({ data, month }) => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = [];
    data.forEach(el => {
      listData.push(...el.eventTimeList);
    });
    const end = value.endOf('D');
    return (
      <ul className="events">
        {renderCell('', { eventTimeList: listData }, '', value)}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} value={toDayJs(month)} />;
};

export default ProjectSchedule;
