import type { ReactNode } from "react"
import useCustomLogin from "../../hooks/useCustomLogin"

// 로그인한 사용자만 children 을 보여줌 (아니면 로그인 페이지로 이동)
function AuthComponent({ children }: { children: ReactNode }) {
  const { loginStatus, moveToLoginReturn } = useCustomLogin()

  if (!loginStatus) {
    return moveToLoginReturn()
  }

  return <>{children}</>
}

export default AuthComponent