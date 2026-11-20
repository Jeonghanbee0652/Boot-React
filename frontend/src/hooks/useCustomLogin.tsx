import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSearchParams, Navigate, useNavigate } from "react-router"
import { loginPostAsync, logout, save } from "../slices/loginSlice"
import type { AppDispatch, RootState } from "../store"
import { getCookie } from "../util/cookieUtil"

const useCustomLogin = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // 로그인 상태 객체
  const loginState = useSelector((state: RootState) => state.loginSlice)

  // 로그인 여부 (true / false)
  const loginStatus = loginState.status === 'fulfilled' && !!loginState.email

  // 새로고침 대응 : 쿠키에 로그인 정보가 있으면 다시 반영
  useEffect(() => {
    if (!loginState.email) {
      const member = getCookie("member")
      if (member) {
        dispatch(save(member))
      }
    }
  }, [])

  const doLogin = async (email: string, pw: string) => {
    dispatch(loginPostAsync({ email, pw }))
  }

  const doLogout = () => {
    dispatch(logout())
  }

  const moveToLogin = () => {
    navigate("/member/login")
  }

  // 로그인 페이지로 이동하는 컴포넌트
  const moveToLoginReturn = () => {
    return <Navigate replace to="/member/login" />
  }

  const moveToPath = (path: string) => {
    navigate({ pathname: path }, { replace: true })
  }

  // 토큰에 따른 예외 처리
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exceptionHandle = (ex: any) => {
    console.log("Exception------------------------")
    console.log(ex)

    const errorMsg: string = ex?.response?.data?.error ?? ex?.message
    const errorStr = createSearchParams({ error: errorMsg }).toString()

    if (errorMsg === 'REQUIRE_LOGIN') {
      alert("로그인 해야만 합니다.")
      navigate({ pathname: '/member/login', search: errorStr })
      return
    }

    if (errorMsg === 'ERROR_ACCESSDENIED') {
      alert("해당 메뉴를 사용할수 있는 권한이 없습니다.")
      navigate({ pathname: '/member/login', search: errorStr })
      return
    }
  }

  return { loginState, loginStatus, doLogin, doLogout, moveToLogin, moveToLoginReturn, moveToPath, exceptionHandle }
}

export default useCustomLogin