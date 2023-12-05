import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/CreateContext";
// import axios from "axios";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const { RegisterRequest } = useContext(UserContext);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", image);
    formData.append("password", setPassword);

    RegisterRequest(formData);

    // await fetch("http://localhost:6000/test");
    console.log("Form  submitted");
  };

  return (
    <div className='bg-grey-700 border-2  min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <form
          onSubmit={formHandler}
          className='bg-white px-6 py-8 rounded-md shadow-xl border  text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed'
            name='fullname'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder='Full Name'
          />

          <input
            type='email'
            className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed '
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='Email'
          />
          <input
            type='file'
            onChange={onFileChange}
            className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed'
            name='file'
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed'
            name='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder='Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-green text-white bg-green-400 hover:bg-green-600 focus:outline-none my-1'>
            Create Account
          </button>

          <div className='text-center text-sm text-grey-dark mt-4'>
            By signing up, you agree to the Terms of Service and Privacy Policy
          </div>
        </form>

        <div className='text-grey-dark mt-6'>
          Already have an account?
          <Link
            className='no-underline border-b border-blue text-blue'
            to='/login'>
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
