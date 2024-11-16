import hecateRequest from '../../../utils/hecateRequest';

/**
 * @description: 添加事项
 * @param {*} params
 * @return {*}
 */
export const addApi = (data) => {
  return hecateRequest('/api/invoiceInfo/add', {
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
  return hecateRequest('/api/invoiceInfo/edit', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 删除事项
 * @param {*} params
 * @return {*}
 */
export const deleteApi = (data) => {
  return hecateRequest('/api/invoiceInfo/delete', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 事项详情
 * @param {*} params
 * @return {*}
 */
export const fetchInvoiceInfo = (params) => {
  return hecateRequest('/api/invoiceInfo/detail', {
    method: 'get',
    params
  })
}

/**
 * @description: 获取事项
 * @param {*} params
 * @return {*}
 */
export const fetchList = (params) => {
  return hecateRequest('/api/invoiceInfo/list', {
    method: 'GET',
    params
  })
}