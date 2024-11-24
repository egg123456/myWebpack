import React from 'react';

const TableMergeFields = ({ fieldInfos }) => {
  return fieldInfos.map(({ label, value }) => {
    return <div>{label ? label + ': ' : ''}{value}</div>
  });
}

export default TableMergeFields;
