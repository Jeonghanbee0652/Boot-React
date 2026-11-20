import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/products`

export const postAdd = async (formData: FormData) => {
  const res = await jwtAxios.post(`${host}/`, formData)
  return res.data
}

export const getList = async (pageParam: PageParam) => {
  const res = await jwtAxios.get(`${host}/list`, { params: pageParam })
  return res.data
}

export const getOne = async (pno: number | string) => {
  const res = await jwtAxios.get(`${host}/${pno}`)
  return res.data
}

export const putOne = async (pno: number | string, formData: FormData) => {
  const res = await jwtAxios.put(`${host}/${pno}`, formData)
  return res.data
}

export const deleteOne = async (pno: number | string) => {
  const res = await jwtAxios.delete(`${host}/${pno}`)
  return res.data
}

// 이미지 주소 (s_ 를 붙이면 썸네일)
export const imageUrl = (fileName: string) => `${host}/view/${fileName}`