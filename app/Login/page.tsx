'use client'
import { useState } from 'react'

// Handling the Login for it to work with the clients actions

export default function LoginPage() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        try {
            const response = await fetch('/api/login', {
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
                setSuccess('Login successful! Redirecting...')
                setError('')
                setTimeout(() => window.location.href = '/', 2000)
            }
        } catch (err) {
            setError('An error occurred during login')
            setSuccess('')
        }
    }

  // The Login page format look
  // Notfications for successful and unsuccesful logins

    return( 
    <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-serif mb-8">Login</h1>

        <p className="font-serif">Welcome Login below</p>
        
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
            />
            <button 
                type="submit"
                className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-800"
            >
                Login
            </button>
        </form>
        
        <a href="/SignUp" className="mt-4 text-blue-800">Need an account? Sign Up</a>
    </div> 
    )
}
   





 
//  export default function LoginPage() {
//   return( 
//   <div>
//        <h1 className="text-5xl font-mono pt-10 ml-5">Login</h1>
//        <section id="Login" className="text-2xl p-10 leading-loose">
   
//      <h2>Login below</h2>

//       <form action="/Login" method="post">

//        <input type="text" name="name" placeholder="Name"></input>
//        <input type="password" name="password" placeholder="Password"></input>
//        <input type="submit"></input>

//       </form>
       
//        <a href="./SignUp">Create new account</a>

//         <p>Logging in successfully? Press the button below to go to the Home Page </p>

//        <a href="./">Go to Home</a>
//     </section>
//   </div> 
  
  
// ) 
// }