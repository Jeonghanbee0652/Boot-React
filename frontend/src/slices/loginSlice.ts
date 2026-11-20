import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/memberApi"
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil"

// API 서버의 로그인 결과
export interface LoginInfo {
  email: string
  nickname: string
  accessToken: string
  refreshToken: string
  roleNames: string[]
  status: string
}

const initState: LoginInfo = {
  email: '',
  nickname: '',
  accessToken: '',
  refreshToken: '',
  roleNames: [],
  status: ''
}

// 새로고침해도 로그인이 유지되도록 쿠키에 저장된 정보로 시작
const loadMemberCookie = (): LoginInfo => {
  const memberInfo = getCookie("member")
  return memberInfo ? memberInfo : initState
}

export const loginPostAsync = createAsyncThunk('loginPostAsync',
  ({ email, pw }: { email: string, pw: string }) => {
    console.log("---------------loginPostAsync---------------------")
    return loginPost(email, pw)
  })

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie(),
  reducers: {
    // 쿠키에서 읽은 로그인 정보를 반영
    save: (_state, action) => {
      console.log("save")
      return action.payload
    },
    logout: () => {
      console.log("logout")
      removeCookie("member")
      return { ...initState }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (_state, action) => {
        console.log("fulfilled", action.payload)

        // 아이디/비밀번호가 틀리면 서버가 {error: 'ERROR_LOGIN'} 을 보냄
        if (action.payload.error) {
          return { ...initState, status: 'error' }
        }

        const newState = { ...action.payload, status: 'fulfilled' }
        setCookie("member", JSON.stringify(newState), 1) // 1일 보관
        return newState
      })
      .addCase(loginPostAsync.pending, (state) => {
        console.log("pending")
        state.status = 'pending'
      })
      .addCase(loginPostAsync.rejected, (state) => {
        console.log("rejected")
        state.status = 'rejected'
      })
  }
})

export const { save, logout } = loginSlice.actions

export default loginSlice.reducer