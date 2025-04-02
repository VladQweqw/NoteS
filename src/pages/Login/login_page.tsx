import { useEffect, useRef } from "react"
import { animation_fade } from "../../assets/data"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import useApi from "../../hooks/useApi"

export default function LoginPage() {
   const navigate = useNavigate()

   const email_el = useRef<HTMLInputElement | null>(null)
   const password_el = useRef<HTMLInputElement | null>(null)

   const { data, error, isLoading, call } = useApi()
   
   function login() {
      const email_val = email_el.current!.value
      const password_val = password_el.current!.value

      // nickname validation
      if(!email_val) {
         email_el.current?.classList.add('input-field-failed')
      }else {
         email_el.current?.classList.remove('input-field-failed')
      }

      // pwd validation
      if(!password_val) {
         return password_el.current?.classList.add('input-field-failed')
      } else {
         password_el.current?.classList.remove('input-field-failed')
      }
      

      // call the api
      call({
         method: 'POST',
         url: "/user/login",
         data: {
            email: email_val,
            password: password_val
         },
         headers: {}
      })
            
   }

   useEffect(() => {
      // save the id of the user
         
      if(data?.id) {                 
         localStorage.setItem('user_id', data.id)
         navigate('/notes')
      }
   }, [data])

   return(
    <main className="main form-main">

         <motion.div
         variants={animation_fade}
         initial="hidden"
         animate="visible"
         className="form-wrapper">
         <h1 className="form-title">Log in 👋</h1>
         <br />
            <form action="POST">
               <div className="input">
                  <label htmlFor="login-email">Email</label>
                  <input 
                  ref={email_el}
                  name="login-email"
                  type="email" 
                  className="input-field" 
                  id="login-email"
                  placeholder="Your email"
                  />
               </div>

               <div className="input">
                  <label htmlFor="login-pwd">Password</label>
                  <input 
                  ref={password_el}
                  name="login-pwd"
                  type="password" 
                  className="input-field" 
                  id="login-pwd"
                  placeholder="Something strong"
                  />
               </div>
               <div className="errors">
                  {error && <p className="error-text"> There was an error 🤔</p>}
                  {data?.error && <p className="error-text">{data.error} 🤔</p>}


                  {data?.detail && <p className="success-text">login succesfully, redirecting... 👌</p>}
               </div>
               <button 
               type="button" 
               className="submit-btn"
               onClick={(e) => {
                  e.preventDefault()
                  login()
               }}
               >
                  {isLoading ? "Loading... 🐌" : 'Log in! 😃'}
               </button>
            </form>
         </motion.div>

         <motion.div 
         variants={animation_fade}
         initial="hidden"
         animate={{
            transform: 'translateY(0%) scale(1)',

            transition: {
               delay: .15
            }
         }}
         className="separator">
            <span className="line"></span>
            <p>or</p>
            <span className="line"></span>

         </motion.div>

         <motion.div 
         variants={animation_fade}
         initial="hidden"
         animate={{
            transform: 'translateY(0%) scale(1)',

            transition: {
               delay: .3
            }
         }}
         
         className="alternative-btn-wrapper">
            <button 
            type="button"
            className="submit-btn alternative-btn"
            onClick={(e) => {
               navigate('/accounts/register')
            }}
            >Register</button>
         </motion.div>

    </main>
   )
}