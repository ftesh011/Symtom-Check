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








//    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
//         <h1 className="text-5xl font-mono mb-8">Sign Up</h1>

//         {error && <div className=' text-red-500 mb-4'>{error}</div>}
//         {success && <div className=' text-green-500 mb-4'>{success}</div>}

//         <form onSubmit={handleSubmit} className='max-w-md w-full space-y-8'></form>
//           <input
//             type='text'
//             name='name'
//             placeholder='Name'
//             className='w-full p-2 border rounded'
//             required
//           />
//           <input
//             type='password'
//             name='password'
//             placeholder='Password'
//             className='w-full p-2 border rounded'
//             required
//             minLength={12}
//           />
//           <button
//             type='submit'
//             className='w-full p-2 bg-blue-500 text-white rounded'
//           >
//             Sign Up
//           </button>
//          </form> 

//          <a href="Login" className='block text-center text-gray-500'>Already have an account? Login</a>
    
//   </div>
//   )
// }


// Orginal Sign Up page below


// export default function SignUpPage() {
//   return( 
//   <div>
//        <h1 className="text-5xl font-mono pt-10 ml-5">Sign Up</h1>
//        <section id="how_it_works" className="text-2xl p-10 leading-loose">
   
//      <h2>Sign Up below</h2>

//       <form action="/SignUp" method="post">

//        <input type="text" name="name" placeholder="Name"></input>
//        <input type="password" name="password" placeholder="Password"></input>
//        <input type="submit"></input>

//       </form>
    
//       <a href="./">Go to Home</a> 
//       <p>Login in below if you already have an account</p>
//       <a href="./Login">Already have an account Login</a>    

//     </section>
//   </div> 
  
  
// ) 
// }
