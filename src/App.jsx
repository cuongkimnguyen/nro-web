import { useMemo, useState } from 'react'
import axios from 'axios'
import { registerUser } from './api'

const initialForm = {
  username: '',
  password: '',
  confirmPassword: '',
}

export default function App() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const passwordsMatch = useMemo(() => {
    if (!form.confirmPassword) return true
    return form.password === form.confirmPassword
  }, [form.password, form.confirmPassword])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    const username = form.username.trim()
    const password = form.password
    const confirmPassword = form.confirmPassword

    if (!username || !password || !confirmPassword) {
      setMessage({ type: 'error', text: 'Vui lòng nhập đầy đủ thông tin.' })
      return
    }

    if (/\s/.test(username)) {
      setMessage({ type: 'error', text: 'Account không được chứa khoảng trắng.' })
      return
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu nhập lại không khớp.' })
      return
    }

    try {
      setSubmitting(true)
      const data = await registerUser({ username, password })

      setMessage({
        type: 'success',
        text: typeof data === 'string' ? data : 'Đăng ký thành công.',
      })
      setForm(initialForm)
    } catch (error) {
      let text = 'Có lỗi xảy ra khi đăng ký.'

      if (axios.isAxiosError(error)) {
        text =
          error.response?.data ||
          (error.code === 'ECONNABORTED'
            ? 'Request timeout khi gọi API.'
            : 'Không thể kết nối tới server. Có thể bạn đang bị lỗi CORS hoặc API chưa mở.')
      }

      setMessage({ type: 'error', text })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-soft md:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                Ngọc Rồng Server
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Tạo tài khoản mới
                <br />
                nhanh và gọn
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-blue-50">
                Form React dùng Axios để gọi API đăng ký người dùng. Giao diện sáng sủa,
                dễ nhìn, phù hợp để nhúng hoặc deploy nhanh.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm font-medium text-white/90">API endpoint</p>
              <p className="mt-2 break-all text-sm text-white">http://160.30.192.170/api/server/cms</p>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 md:hidden">
                <div className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                  Ngọc Rồng Server
                </div>
                <h1 className="mt-4 text-3xl font-bold text-slate-800">Đăng ký thành viên</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Điền account và password để tạo tài khoản.
                </p>
              </div>

              <div className="mb-8 hidden md:block">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                  Register Form
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-800">Đăng ký thành viên</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Chỉ cần account, password và nhập lại password.
                </p>
              </div>

              <form className="space-y-5" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-700">
                    Account
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={onChange}
                    placeholder="Nhập account"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Nhập password"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                    Re-input Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={onChange}
                    placeholder="Nhập lại password"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  />
                  {!passwordsMatch && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      Mật khẩu nhập lại không khớp.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:from-sky-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? 'Đang đăng ký...' : 'Đăng ký ngay'}
                </button>
              </form>

              {message.text && (
                <div
                  className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                    message.type === 'success'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-red-200 bg-red-50 text-red-600'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
                <p>
                  <span className="font-semibold text-slate-700">Lưu ý:</span> nếu frontend chạy khác domain với API,
                  bạn có thể cần cấu hình CORS ở backend Spring Boot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
