import hecateRequest from '../../../utils/hecateRequest';

/**
 * @description: 获取事项
 * @param {*} params
 * @return {*}
 */
export const fetchEventList = (params) => {
  return hecateRequest('/api/event/getEventList', {
    method: 'GET',
    params
  })
}

/**
 * @description: 添加事项
 * @param {*} params
 * @return {*}
 */
export const addApi = (data) => {
  return hecateRequest('/api/algorithm/add', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 编辑事项
 * @param {*} params
 * @return {*}
 */
export const editApi = (data) => {
  return hecateRequest('/api/algorithm/edit', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 删除事项
 * @param {*} params
 * @return {*}
 */
export const deleteAlgorithmApi = (data) => {
  return hecateRequest('/api/algorithm/delete', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 事项详情
 * @param {*} params
 * @return {*}
 */
export const fetchAlgorithmDetail = (params) => {
  return hecateRequest('/api/algorithm/detailById', {
    method: 'get',
    params
  })
}

/**
 * @description: 获取事项
 * @param {*} params
 * @return {*}
 */
export const fetchAlgorithmList = (params) => {
  return hecateRequest('/api/algorithm/getList', {
    method: 'GET',
    params
  })
}