import hecateRequest from '../../../utils/hecateRequest';

export const fetchApps = (params) => {
  return hecateRequest('/api/getApps', {
    method: 'GET',
    params
  })
}
