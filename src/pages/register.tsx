import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import  { useAuth }  from '../contexts/AuthContext'
import  Link from 'next/link'
import * as Yup from "yup";

const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars min"),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required')
});

interface Values {
  email: string,
  password: string,
  passwordConfirmation:string
}

const Register:React.FC = () => {
    const [error, setError] = useState<string>("")
    const router = useRouter()
    const { signup } = useAuth()
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen space-y-4 bg-gray-800'>
        <div className='flex flex-col items-center w-1/2 p-24 align-middle border-4 border-yellow-300 rounded'>
          <h1 className="mb-5 text-5xl font-extrabold text-yellow-300">Join Star Wars</h1>
          <Formik
            initialValues={{
                email:'',
                password: '',
                passwordConfirmation:''
            }}
            validationSchema={signInSchema}
            onSubmit={async (values: Values, {setSubmitting} : FormikHelpers<Values>) => {
                try {
                    setError('')
                    setSubmitting(true)
                   await signup(values.email,values.password)
                   router.push('/dashboard')
                } catch(err) {
                    setError(err.message)
                }
                setSubmitting(false)
            }}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty, isSubmitting } = formik;
              return (
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-semibold text-white">Sign up to continue</h1>
                  <Form className="flex flex-col w-64 h-64 mt-2 space-y-4">
                    <div className="flex flex-col h-20">
                      <label htmlFor="email" className='text-white'>Email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={
                          errors.email && touched.email ? "p-1" : "p-1"
                        }
                      />
                      <ErrorMessage name="email" component="span" className="text-red-400" />
                    </div>

                    <div className="flex flex-col h-20">
                      <label htmlFor="password" className='text-white'>Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={
                          errors.password && touched.password ? "p-1" : "p-1"
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="text-red-400"
                      />
                    </div>
                    <div className="flex flex-col h-20">
                      <label htmlFor="passwordConfirmation" className='text-white'>Confirm Password</label>
                      <Field
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        className={
                          errors.passwordConfirmation && touched.passwordConfirmation ? "p-1" : "p-1"
                        }
                      />
                      <ErrorMessage
                        name="passwordConfirmation"
                        component="span"
                        className="text-red-400"
                      />
                    </div>
                    <div className='self-center'>
                      <button
                        type="submit"
                        className={!(dirty && isValid) ? 
                          "text-red-400 text-lg mx-auto mt-4 border-2 py-1 px-2 border-red-400 rounded" :
                          "text-white text-lg mt-4 border-2 py-1 px-2 border-white rounded"}
                        disabled={!(dirty && isValid) || isSubmitting}
                      >
                        Sign Up
                      </button>
                    </div>
                    {error && (
                        <div>
                            <p className='text-red-400'>{error}</p>
                        </div>
                    )}
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
        <div className='w-1/2 p-4 text-center text-white border-4 border-yellow-300 rounded'>
          <p>Already have the account? <Link href='/'><a className="text-yellow-300">Login</a></Link></p>
        </div>
    </div>
  )
}

export default Register