import hecateRequest from '../../../utils/hecateRequest';

/**
 * @description: 获取ceremony
 * @param {*} params
 * @return {*}
 */
export const fetchCeremonyRecord = (params) => {
  return hecateRequest('/api/getCeremonyRecord', {
    method: 'GET',
    params
  })
}

/**
 * @description: 获取ceremonyBooks
 * @param {*} params
 * @return {*}
 */
export const fetchCeremonyBooks = (params) => {
  return hecateRequest('/api/getCeremonyBooks', {
    method: 'GET',
    params
  })
}

/**
 * @description: 获取ceremonyDetail
 * @param {*} params
 * @return {*}
 */
export const fetchCeremonyBookDetail = (params) => {
  return hecateRequest('/api/getCeremonyBookDetail', {
    method: 'GET',
    params
  })
}


/**
 * @description: 添加事项
 * @param {*} params
 * @return {*}
 */
export const addCeremonyBookApi = (data) => {
  return hecateRequest('/api/addCeremonyBook', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 编辑事项
 * @param {*} params
 * @return {*}
 */
export const editCeremonyBookApi = (data) => {
  return hecateRequest('/api/editCeremonyBook', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 删除事项
 * @param {*} params
 * @return {*}
 */
export const deleteCeremonyBookApi = (data) => {
  return hecateRequest('/api/deleteCeremonyBook', {
    method: 'POSt',
    data
  })
}
