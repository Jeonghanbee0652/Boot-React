import { useState } from "react"
import useCustomLogin from "../../hooks/useCustomLogin"
import ResultModal from "../common/resultModal"

function LoginComponent() {
  const { loginState, doLogin, moveToPath } = useCustomLogin()
  const loginStatus = loginState.status

  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const handleLogin = () => {
    doLogin(email, pw)
  }

  const closeModal = () => {
    moveToPath('/')
  }

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 bg-white min-w-[500px]">
      {loginStatus === 'pending' && <div className="bg-amber-300 p-2">로그인 중...</div>}
      {loginStatus === 'error' && <div className="bg-red-300 p-2">이메일 또는 비밀번호가 틀렸습니다</div>}
      {loginStatus === 'rejected' && <div className="bg-red-300 p-2">로그인 실패 (서버 확인)</div>}
      {loginStatus === 'fulfilled' &&
        <ResultModal title="Login Result" content="로그인 되었습니다." callbackFn={closeModal} />}

      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-6 text-left font-bold">Email</div>
          <input className="w-full p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email" type={'text'} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-full p-6 text-left font-bold">Password</div>
          <input className="w-full p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw" type={'password'} value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button type='button'
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
              onClick={handleLogin}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent