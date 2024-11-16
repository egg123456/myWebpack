import hecateRequest from '../../../utils/hecateRequest';

export const fetchApps = (params) => {
  return hecateRequest('/api/getApps', {
    method: 'GET',
    params
  })
}

export const createDatabaseTableApi = (data) => {
  return hecateRequest('/api/createDataTable', {
    method: 'POST',
    data,
  })
}

export const deleteDatabaseTableApi = (data) => {
  return hecateRequest('/api/deleteDataTable', {
    method: 'POST',
    data,
  })
}
