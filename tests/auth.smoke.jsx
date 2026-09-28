/**
 * Smoke test for the /login and /signup routes.
 * Rendered with react-dom/server to assert both auth modes output correctly.
 *
 * Run: npm run test:auth
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { createElement } from 'react'
import Auth from '../src/pages/Auth.jsx'

function collect(html) {
  const buttons = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim(),
  )
  const inputs = [...html.matchAll(/<input[^>]*type="([^"]+)"/g)].map((m) => m[1])
  return { buttons, inputs, html }
}

function renderAt(path, initialMode) {
  const tree = createElement(
    MemoryRouter,
    { initialEntries: [path] },
    createElement(
      Routes,
      null,
      createElement(Route, { path: '/login', element: createElement(Auth) }),
      createElement(Route, { path: '/signup', element: createElement(Auth, { initialMode }) }),
    ),
  )
  return collect(renderToStaticMarkup(tree))
}

const signIn = renderAt('/login')
const signUp = renderAt('/signup', 'signup')

const checks = [
  ['signin: heading rendered', signIn.html.includes('Welcome Back')],
  ['signin: email + password fields', signIn.inputs.filter((t) => t === 'email' || t === 'password').length === 2],
  ['signin: google button', signIn.buttons.includes('Continue with Google')],
  ['signin: remember-me checkbox', signIn.inputs.includes('checkbox')],
  ['signin: footer prompts "Sign Up"', signIn.buttons.includes('Sign Up')],
  ['signin: signup form hidden', !signIn.html.includes('Full Name')],
  ['signin: divider copy', signIn.html.includes('Or continue with enterprise email')],
  ['signup: heading rendered', signUp.html.includes('Start Your Free Cloud Observability Trial')],
  ['signup: two password fields', signUp.inputs.filter((t) => t === 'password').length === 2],
  ['signup: footer prompts "Sign In"', signUp.buttons.includes('Sign In')],
  ['signup: signin form hidden', !signUp.html.includes('Welcome Back')],
  ['signup: strength meter present', signUp.html.includes('Strength:')],
  ['signup: divider copy', signUp.html.includes('Or register with work email')],
  ['a11y: tablist + tabpanel roles', signIn.html.includes('role="tablist"') && signUp.html.includes('role="tabpanel"')],
  ['a11y: both tabs expose aria-selected', (signIn.html.match(/aria-selected/g) || []).length === 2],
  ['a11y: back-to-site link', signIn.html.includes('Back to site')],
  ['brand: CloudPulse + tagline', signIn.html.includes('Enterprise Observability')],
]

let failed = 0
for (const [name, ok] of checks) {
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
}
console.log(failed ? `\n${failed} check(s) failed` : `\nAll ${checks.length} checks passed`)
process.exit(failed ? 1 : 0)
