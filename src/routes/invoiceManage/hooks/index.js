import React, { useCallback, useState } from 'react';

const useRowSelect = () => {
  const [rows = [], setRows] = useState();

  const handleSelectChange = useCallback((keys, rows) => {
    console.log(keys, rows)
    setRows(rows);
  }, [])

  return { rows, handleSelectChange }
}

export default useRowSelect;
