export default function LoginPage() {
    return( 
    <div>
         <h1 className="text-5xl font-mono pt-10 ml-5">Login</h1>
         <section id="Login" className="text-2xl p-10 leading-loose">
     
       <h2>Login below</h2>
 
        <form action="/Login" method="post">
 
         <input type="text" name="name" placeholder="Name"></input>
         <input type="password" name="password" placeholder="Password"></input>
         <input type="submit"></input>
 
        </form>
         
         <a href="./SignUp">Create new account</a>

          <p>Logging in successfully? Press the button below to go to the Home Page </p>

         <a href="./">Go to Home</a>
      </section>
    </div> 
    
    
 ) 
 }