import hecateRequest from '../../../utils/hecateRequest';


/**
 * @description: 添加事项
 * @param {*} params
 * @return {*}
 */
export const fetchCeremonyRecordDetail = (params) => {
  return hecateRequest('/api/getCeremonyRecordDetail', {
    method: 'GET',
    params
  })
}

/**
 * @description: 添加事项
 * @param {*} params
 * @return {*}
 */
export const addCeremonyRecordApi = (data) => {
  return hecateRequest('/api/addCeremonyRecord', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 编辑事项
 * @param {*} params
 * @return {*}
 */
export const editCeremonyRecordApi = (data) => {
  return hecateRequest('/api/editCeremonyRecord', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 删除事项
 * @param {*} params
 * @return {*}
 */
export const deleteCeremonyRecordApi = (data) => {
  return hecateRequest('/api/deleteCeremonyRecord', {
    method: 'POSt',
    data
  })
}
