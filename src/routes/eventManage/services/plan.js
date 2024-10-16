import hecateRequest from '../../../utils/hecateRequest';

/**
 * @description: 获取事项
 * @param {*} params
 * @return {*}
 */
export const fetchPlanList = (params) => {
  return hecateRequest('/api/event/getPlanList', {
    method: 'GET',
    params
  })
}

/**
 * @description: 添加事项
 * @param {*} params
 * @return {*}
 */
export const addPlanApi = (data) => {
  return hecateRequest('/api/event/addPlan', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 编辑事项
 * @param {*} params
 * @return {*}
 */
export const editPlanApi = (data) => {
  return hecateRequest('/api/event/editPlan', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 删除事项
 * @param {*} params
 * @return {*}
 */
export const deletePlanApi = (data) => {
  return hecateRequest('/api/event/deletePlan', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 事项详情
 * @param {*} params
 * @return {*}
 */
export const fetchPlanDetail = (params) => {
  return hecateRequest('/api/event/planDetailById', {
    method: 'get',
    params
  })
}