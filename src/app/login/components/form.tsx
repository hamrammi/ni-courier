'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions'
import { SubmitButton } from './submit-button'

const initialState = {
  error: ''
}

export default function LoginForm () {
  const [state, formAction] = useActionState(loginAction, initialState)

  return (
    <form
      className="space-y-4 p-4 w-full max-w-sm"
      action={formAction}
    >
      <h2 className="text-2xl font-bold">Login</h2>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <div className="space-y-2">
        <label className="block" htmlFor="login">
          Login
        </label>
        <input
          className="block w-full px-4 py-2 border rounded-md"
          type="text"
          id="login"
          name="login"
          required={true}
        />
      </div>
      <div className="space-y-2">
        <label className="block" htmlFor="password">
          Password
        </label>
        <input
          className="block w-full px-4 py-2 border rounded-md"
          type="password"
          id="password"
          name="password"
          required={true}
        />
      </div>
      <SubmitButton />
    </form>
  )
}
