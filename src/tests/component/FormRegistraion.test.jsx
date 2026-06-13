import { describe, it, expect, vi } from 'vitest'
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx'
import { toast } from 'react-toastify'


const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock,
}))
vi.mock('../../components/services/registration.service.js', () => ({ signUp: vi.fn() }))
vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const renderForm = () => render(<MemoryRouter><RegistrationForm /></MemoryRouter>)

describe('RegitrationForm success', () => {
  it('mostra il bottone registrati', () => {
    renderForm()
    expect(screen.getByRole('button', { name: /registrati/i })).toBeInTheDocument()
  })

  it('contiene i campi name, email, password, conferma password,', () => {
    renderForm()
    expect(document.querySelector('input[name="nome"]')).toBeInTheDocument()
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument()
    expect(document.querySelector('input[name="password"]')).toBeInTheDocument()
    expect(document.querySelector('input[name="confermaPassword"]')).toBeInTheDocument()
  })

  it('la card contiene un heading Registrati', () => {
    renderForm()
    const card = screen.getByTestId('card-component')
    expect(within(card).getByRole('heading', { name: /registrati/i })).toBeInTheDocument()
  })

  it('registrazione con successo: toast, e navigazione', async () => {
    const { signUp } = await import('../../components/services/registration.service.js')
    renderForm()
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/indirizzo email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/^conferma password$/i), { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /registrati/i }).closest('form'))
    expect(screen.getByLabelText(/indirizzo email/i)).toHaveValue('test@example.com')
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('registrazione avvenuta con successo, conferma la tua email')
      expect(navigateMock).toHaveBeenCalledWith('/login')
    })
  })
})
describe('RegitrationForm inserimento dati non validi', () => {
  it('Email non valida', async () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/indirizzo email/i), { target: { value: 'email_non_valida' } })
    fireEvent.submit(screen.getByRole('button', { name: /registrati/i }).closest('form'))
    expect(await screen.findByText(/^email non valida$/i)).toBeInTheDocument()
  })

  it('nome, email, password obbligatorie', async () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/^nome$/i), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText(/^indirizzo email$/i), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: '' } })
    fireEvent.submit(screen.getByRole('button', { name: /registrati/i }).closest('form'))
    expect(await screen.findByText(/^Nome obbligatorio$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^Email obbligatoria$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^Password obbligatoria$/i)).toBeInTheDocument()
  })

  it('email non valida, password non coincidente', async () => {
    const { signUp } = await import('../../components/services/registration.service.js')
    renderForm()
    fireEvent.change(screen.getByLabelText(/^nome$/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/^indirizzo email$/i), { target: { value: 'testexample.com' } })
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/^conferma password$/i), { target: { value: 'password12' } })
    fireEvent.submit(screen.getByRole('button', { name: /registrati/i }).closest('form'))
    expect(await screen.findByText(/^email non valida$/i)).toBeInTheDocument()
    expect(await screen.findByText(/^le password non coincidono$/i)).toBeInTheDocument()

  })
  it('Password troppo corta', async () => {
    renderForm()
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'pass' } })
    fireEvent.submit(screen.getByRole('button', { name: /registrati/i }).closest('form'))
    expect(await screen.findByText(/^La password deve essere lunga almeno 6 caratteri$/i)).toBeInTheDocument()
  })
  it.only('registrazione fallita', async () => {
    const { signUp } = await import('../../components/services/registration.service.js')
    renderForm()
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/indirizzo email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/^conferma password$/i), { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /registrati/i }).closest('form'))
    expect(screen.getByLabelText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/indirizzo email/i)).toHaveValue('test@example.com')
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('registrazione fallita')
    })
  })
});