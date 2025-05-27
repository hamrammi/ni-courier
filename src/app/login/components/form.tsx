'use client'

import { useActionState, useState } from 'react'
import { loginAction } from '../actions'
import { Eye, EyeOff } from 'lucide-react'

interface InitialState {
  error: string
  validationErrors: Record<string, string>
}

const initialState: InitialState = {
  error: '',
  validationErrors: {}
}

export default function LoginForm () {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <form
      className="space-y-4 p-4 w-full max-w-sm"
      action={formAction}
    >
      <h2 className="text-3xl font-black text-center">Вход курьера</h2>
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.validationErrors.login && <p className="text-red-500">{state.validationErrors.login}</p>}
      {state.validationErrors.password && <p className="text-red-500">{state.validationErrors.password}</p>}
      <div className="space-y-2">
        <label className="block" htmlFor="login">
          Телефон
        </label>
        <input
          className="block w-full px-4 py-2 border rounded-md bg-white"
          type="text"
          id="login"
          name="login"
          required={true}
        />
      </div>
      <div className="space-y-2 relative">
        <label className="block" htmlFor="password">
          Пароль
        </label>
        <input
          className="block w-full px-4 py-2 border rounded-md bg-white"
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          required={true}
        />
        <div
          className="absolute h-11 w-11 right-0 bottom-0 flex items-center justify-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword && <EyeOff />}
          {showPassword && <Eye />}
        </div>
      </div>
      <button
        className="block w-full px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-700 font-semibold"
        type="submit"
        disabled={isPending}
      >
        Войти
      </button>
    </form>
  )
}
