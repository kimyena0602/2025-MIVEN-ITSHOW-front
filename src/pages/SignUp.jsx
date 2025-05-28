import React, { useState } from 'react'
import '../styles/SignUp.css'

function SignUp() {
  const [form, setForm] = useState({ username: '', password: '', email: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('회원가입 완료!')
  }

  return (
    <form className="signup-container" onSubmit={handleSubmit}>
      <h2 className="title">회원가입</h2>

      <div className="input-group-box">
        <div className="input-line">
          <img src="/src/assets/images/person.png" alt="아이디" />
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-line">
          <img src="/assets/lock.png" alt="비밀번호" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <img
            src={
              showPassword ? '/assets/eye-off.png' : '/assets/eye-on.png'
            }
            alt="비밀번호 보기"
            className="eye-toggle"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="input-line">
          <img src="/assets/email.png" alt="이메일" />
          <input
            type="email"
            name="email"
            placeholder="이메일주소"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button className="signup-button" type="submit">
        회원가입
      </button>
    </form>
  )
}

export default SignUp
