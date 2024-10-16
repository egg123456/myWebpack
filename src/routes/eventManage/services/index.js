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
export const addEventApi = (data) => {
  return hecateRequest('/api/event/addEvent', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 编辑事项
 * @param {*} params
 * @return {*}
 */
export const editEventApi = (data) => {
  return hecateRequest('/api/event/editEvent', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 删除事项
 * @param {*} params
 * @return {*}
 */
export const deleteEventApi = (data) => {
  return hecateRequest('/api/event/deleteEvent', {
    method: 'POSt',
    data
  })
}

/**
 * @description: 事项详情
 * @param {*} params
 * @return {*}
 */
export const fetchEventDetail = (params) => {
  return hecateRequest('/api/event/eventDetailById', {
    method: 'get',
    params
  })
}

/**
 * @description: 获取事项
 * @param {*} params
 * @return {*}
 */
export const fetchEventTimeList = (data) => {
  return hecateRequest('/api/event/getEventTimeList', {
    method: 'POST',
    data
  })
}