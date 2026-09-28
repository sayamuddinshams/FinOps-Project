import { useMemo, useState } from 'react'
import MaterialSymbol from '@/components/MaterialSymbol'
import Divider from './Divider'
import PasswordStrength from './PasswordStrength'
import TextField from './TextField'
import { GoogleButton } from './SignInForm'

const EMPTY = { name: '', email: '', password: '', confirm: '' }

export default function SignUpForm() {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const mismatch = useMemo(
    () => form.confirm.length > 0 && form.confirm !== form.password,
    [form.confirm, form.password],
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirm) {
      setError('Fill in every field to create your account.')
      return
    }
    if (mismatch) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setError('')
    // TODO: wire to your auth provider
    console.info('sign-up', { name: form.name, email: form.email })
  }

  return (
    <div className="flex flex-col">
      <div className="mb-space-lg">
        <h1 className="font-headline-md text-headline-md tracking-tight text-on-surface">
          Start Your Free Cloud Observability Trial
        </h1>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
          No credit card required. Full access to demo &amp; live telemetry.
        </p>
      </div>

      <GoogleButton />

      <Divider className="my-space-md">Or register with work email</Divider>

      <form className="flex flex-col gap-space-sm" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
          <TextField
            label="Full Name"
            icon="badge"
            placeholder="Devin Patel"
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            inputClassName="pr-3"
          />
          <TextField
            label="Work Email"
            icon="mail"
            type="email"
            placeholder="devin@acme.corp"
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            inputClassName="pr-3"
          />
        </div>

        <div className="mt-1 flex flex-col gap-1.5">
          <TextField
            label="Password"
            icon="key"
            type="password"
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            value={form.password}
            onChange={set('password')}
          />
          <PasswordStrength password={form.password} />
        </div>

        <TextField
          label="Confirm Password"
          icon="verified_user"
          type="password"
          placeholder="Re-enter password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set('confirm')}
          inputClassName={mismatch ? 'ring-1 ring-status-crit' : ''}
        />

        {mismatch && (
          <p role="alert" className="flex items-center gap-space-xs text-body-sm text-error">
            <MaterialSymbol name="error" className="text-body-sm" />
            Passwords do not match.
          </p>
        )}

        <p className="mt-1 text-center font-body-sm text-body-sm text-on-surface-variant/80">
          By signing up, you agree to our{' '}
          <a href="#terms" className="text-primary-container hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#privacy" className="text-primary-container hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        {error && !mismatch && (
          <p role="alert" className="flex items-center gap-space-xs text-body-sm text-error">
            <MaterialSymbol name="error" className="text-body-sm" />
            {error}
          </p>
        )}

        <button type="submit" className="btn-auth-primary mt-1">
          <span>Create Account</span>
          <MaterialSymbol name="rocket_launch" className="text-title-md" />
        </button>
      </form>
    </div>
  )
}
