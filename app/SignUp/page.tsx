export default function SignUpPage() {
   return( 
   <div>
        <h1 className="text-5xl font-mono pt-10 ml-5">Sign Up</h1>
        <section id="how_it_works" className="text-2xl p-10 leading-loose">
    
      <h2>Sign Up below</h2>

       <form action="/SignUp" method="post">

        <input type="text" name="name" placeholder="Name"></input>
        <input type="password" name="password" placeholder="Password"></input>
        <input type="submit"></input>

       </form>
     
       <a href="./">Go to Home</a> 
       <p>Login in below if you already have an account</p>
       <a href="./Login">Already have an account Login</a>    

     </section>
   </div> 
   
   
) 
}
