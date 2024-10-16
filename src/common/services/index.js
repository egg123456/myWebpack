import hecateRequest from "../../utils/hecateRequest";

export const loginApi = (data) => {
  return hecateRequest('/users/login', {
    method: 'POST',
    data,
  })
}

export const registerApi = (data) => {
  return hecateRequest('/users/reg', {
    method: 'POST',
    data,
  })
}


export const getUserInfoApi = (data) => {
  return hecateRequest('/users/info', {
    method: 'POST',
    data,
  })
}