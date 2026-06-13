import { describe, it, expect, vi} from 'vitest'
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RegitrationForm from '../../components/RegistrationForm/RegistrationForm.component.jsx'
import { toast } from 'react-toastify'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock,
}))
vi.mock('../../components/services/registration.service.js', () => ({ signIn: vi.fn() }))
vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const renderForm = () => render(<MemoryRouter><RegitrationForm /></MemoryRouter>)

describe('RegitrationForm success', () => {
  it('mostra il bottone login', () => {
    renderForm()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('contiene i campi email e password', () => {
    renderForm()
    expect(screen.getByLabelText(/indirizzo email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('i campi hanno i name corretti', () => {
    renderForm()
    expect(screen.getByRole('textbox', { selector: 'input[name="email"]' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { selector: 'input[name="password"]' })).toBeInTheDocument()
  })

  it('ha un link per la registrazione', () => {
    renderForm()
    expect(screen.getByRole('link', { name: /registrati/i })).toBeInTheDocument()
  })

  it('la card contiene un heading Login', () => {
    renderForm()
    const card = screen.getByTestId('card-component')
    expect(within(card).getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('login con successo: toast, token e navigazione', async () => {
    const { signIn } = await import('../../components/services/login.service.js')
    signIn.mockResolvedValue({ accessToken: 'fake-token' })
    renderForm()
    fireEvent.change(screen.getByLabelText(/indirizzo email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'))
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login effettuato')
      expect(localStorage.getItem('token')).toBe('fake-token')
      expect(navigateMock).toHaveBeenCalledWith('/posts')
    })
  })
})
describe('RegitrationForm inserimento dati non validi', () => {
  it('Email non valida', async () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/indirizzo email/i), { target: { value: 'email_non_valida' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'))
    expect(await screen.findByText(/email non valida/i)).toBeInTheDocument()
  })

  it('Password troppo corta', async () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/indirizzo email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'corta' } })
    fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'))
    expect(await screen.findByText(/La password deve essere lunga almeno 6 caratteri/i)).toBeInTheDocument()
  })
  it('email e password vuoti mostrano errori di validazione', async () => {
  renderForm()
  fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'))
  await waitFor(() => {
    expect(screen.getByText(/email obbligatoria/i)).toBeInTheDocument()
    expect(screen.getByText(/password obbligatoria/i)).toBeInTheDocument()
  })
})
it('email o password sbagliate', async () => {
  const { signIn } = await import('../../components/services/login.service.js')
  signIn.mockRejectedValue({ response: { status: 401 } })
  renderForm()
  fireEvent.change(screen.getByLabelText(/indirizzo email/i), { target: { value: 'test@example.com' } })
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
  fireEvent.submit(screen.getByRole('button', { name: /login/i }).closest('form'))
  await waitFor(() => {
       expect(toast.error).toHaveBeenCalledWith('Errore nel login')
  })
})
});