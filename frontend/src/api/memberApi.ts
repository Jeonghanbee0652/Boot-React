import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/member`

// 스프링 시큐리티 로그인 : username, password 를 form 방식으로 전송
export const loginPost = async (email: string, pw: string) => {
  const header = { headers: { "Content-Type": "application/x-www-form-urlencoded" } }

  const form = new URLSearchParams()
  form.append('username', email)
  form.append('password', pw)

  const res = await axios.post(`${host}/login`, form, header)

  return res.data
}