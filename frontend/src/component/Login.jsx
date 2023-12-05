import { Link } from "react-router-dom";
import { UserContext } from "../context/CreateContext";
import { useContext, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { LoginRequest } = useContext(UserContext);

  const formHandler = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };
    LoginRequest(formData);
  };

  return (
    <div className='bg-grey-700 border-2  min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <form
          onSubmit={formHandler}
          className='bg-white px-6 py-8 rounded-md shadow-xl border  text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign in</h1>
          <input
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed '
            name='email'
            placeholder='Email'
          />

          <input
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed'
            name='password'
            placeholder='Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-green text-white bg-green-400 hover:bg-green-600 focus:outline-none my-1'>
            Sign In
          </button>

          <div className='text-center text-sm text-grey-dark mt-4'>
            By signing up, you agree to the Terms of Service and Privacy Policy
          </div>
        </form>

        <div className='text-grey-dark mt-6'>
          if you don&apos;t have account?
          <Link
            className='no-underline border-b border-blue text-blue'
            to='/register'>
            Sign Up
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default Login;
