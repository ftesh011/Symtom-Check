'use client'
import { useState } from 'react'

// Handling the SignUp for it to work with the clients actions

export default function SignUpPage() {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		
		try {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.get('name'),
					password: formData.get('password'),
				}),
			})

			const data = await response.json()
			
			if (!response.ok) {
				setError(data.error)
				setSuccess('')
			} else {
				setSuccess('Signed up successfully! Redirecting...')
				setError('')
				setTimeout(() => window.location.href = '/Login', 2000)
			}
		} catch (err) {
			setError('Unfortunately an error has occurred during the Sign Up process')
			setSuccess('')
		}
	}

  // The Sign Up page format look
  // Notfications for successful and unsuccesful sign ups
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-5xl font-serif mb-8">Sign Up</h1>
			
			<p className="font-serif">Welcome Sign Up below</p>

			{error && <div className="text-red-500 mb-4">{error}</div>}
			{success && <div className="text-green-500 mb-4">{success}</div>}
			
			<form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
				<input 
					type="text" 
					name="name" 
					placeholder="Username"
					className="w-full p-2 border rounded"
					required
				/>
				<input 
					type="password" 
					name="password" 
					placeholder="Password"
					className="w-full p-2 border rounded"
					required
					minLength={6}
				/>
				<button 
					type="submit"
					className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-800"
				>
					Sign Up
				</button>
			</form>
			
			<a href="/Login" className="mt-4 text-blue-800">Already have an account? Login</a>
		</div>
	)
}
