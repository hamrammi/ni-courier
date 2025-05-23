import { useFormStatus } from 'react-dom'

export function SubmitButton () {
  const { pending } = useFormStatus()
  return (
    <button
      className="block w-full px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-blue-700"
      type="submit"
      disabled={pending}
    >
      Войти
    </button>
  )
}
