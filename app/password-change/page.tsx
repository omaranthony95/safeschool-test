'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
	EyeIcon,
	EyeSlashIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function PasswordChange() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const passwordRules = {
		minLength: password.length >= 8,
		number: /[0-9]/.test(password),
		lowercase: /[a-z]/.test(password),
		uppercase: /[A-Z]/.test(password),
		specialChar: /[^A-Za-z0-9]/.test(password),
	}

	const isPasswordValid = Object.values(passwordRules).every(Boolean)
	const isFormValid = isPasswordValid && password === confirmPassword && password !== ''

	const ruleList: { key: keyof typeof passwordRules; label: string }[] = [
		{ key: 'minLength', label: 'Al menos 8 caracteres' },
		{ key: 'number', label: 'Al menos 1 número (0…9)' },
		{ key: 'lowercase', label: 'Al menos 1 letra minúscula (a…z)' },
		{ key: 'uppercase', label: 'Al menos 1 letra mayúscula (A…Z)' },
		{ key: 'specialChar', label: 'Al menos 1 símbolo especial (!…$)' },
	]

	return (
		<main className='min-h-screen flex items-center justify-center p-6 bg-base-100'>
			<button
				type="button"
				onClick={() => router.push('/main')}
				className="btn btn-outline btn-primary absolute top-6 left-6"
			>
				Menú
			</button>
			<div className='w-full max-w-md bg-white p-8 rounded-2xl text-center'>

				<div className='flex justify-center mb-6'>
					<Image
						src="/logo-safe-school.svg"
						alt="Safe School"
						width={200}
						height={100}
						priority
						className="w-[200px] h-[100px]"
					/>
				</div>

				<h1 className='font-sans text-3xl font-semibold'>¡Bienvenido!</h1>
				<p className='text-gray-600 mt-4 mb-6'>Ingresa tu contraseña</p>

				<form className='space-y-4'>

					<div className='relative w-full'>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Ingresa tu contraseña'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='input w-full rounded-full bg-gray-100 py-6 px-7 pr-16 focus:outline-none focus:ring-2 focus:ring-primary border-none'
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-5 top-1/2 -translate-y-1/2 text-primary z-10'
						>
							{showPassword
								? <EyeSlashIcon className='w-5 h-5' />
								: <EyeIcon className='w-5 h-5' />}
						</button>
					</div>

					{password.length === 0 ? (
						<>
							<p className='text-xs text-gray-500 text-left ml-0 mt-1'>
  Mínimo 8 caracteres con números y letras
</p>

							<div className='relative w-full'>
								<input
									type={showConfirm ? 'text' : 'password'}
									placeholder='Confirmar contraseña'
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
									className='input w-full rounded-full bg-gray-100 py-6 px-7 pr-16 focus:outline-none focus:ring-2 focus:ring-primary border-none'
								/>
								<button
									type='button'
									onClick={() => setShowConfirm(!showConfirm)}
									className='absolute right-5 top-1/2 -translate-y-1/2 text-primary z-10'
								>
									{showConfirm
										? <EyeSlashIcon className='w-5 h-5' />
										: <EyeIcon className='w-5 h-5' />}
								</button>
							</div>
						</>
					) : (
						<>
							<div className='bg-gray-100 p-4 rounded-md text-xs'>
								{ruleList.map(({ key, label }) => {
									const ok = passwordRules[key]
									return (
										<div
											key={key}
											className='flex items-center py-1.5 leading-5'
										>
											{ok ? (
												<CheckCircleIcon className='w-4 h-4 text-green-600 shrink-0' />
											) : (
												<span className='w-4 h-4 rounded-full border-2 border-red-500 shrink-0' />
											)}
											<span className='ml-3 font-medium'>{label}</span>
										</div>
									)
								})}
							</div>

							{isPasswordValid && (
								<div className='relative w-full'>
									<input
										type={showConfirm ? 'text' : 'password'}
										placeholder='Confirmar contraseña'
										value={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
										className='input w-full rounded-full bg-gray-100 py-6 px-7 pr-16 focus:outline-none focus:ring-2 focus:ring-primary border-none'
									/>
									<button
										type='button'
										onClick={() => setShowConfirm(!showConfirm)}
										className='absolute right-5 top-1/2 -translate-y-1/2 text-primary z-10'
									>
										{showConfirm
											? <EyeSlashIcon className='w-5 h-5' />
											: <EyeIcon className='w-5 h-5' />}
									</button>
								</div>
							)}
						</>
					)}

					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault()
							router.push('/main')
						}}
						disabled={!isFormValid}
						className={`btn w-full rounded-full ${isFormValid ? 'btn-primary' : 'btn-disabled'
							}`}
					>
						Siguiente
					</button>
				</form>
			</div>
		</main>
	)
}
