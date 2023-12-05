import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/CreateContext";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className='bg-[#f3f3f3]'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex-1 md:flex md:items-center md:gap-12'>
            <Link to={"/"} className='block text-teal-600'>
              SocialLink
            </Link>
          </div>

          <div className='md:flex md:items-center md:gap-12'>
            <div className='flex items-center gap-4'>
              {!user ? (
                <>
                  <div className='sm:flex sm:gap-4'>
                    <Link
                      className='rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow'
                      to='/login'>
                      Login
                    </Link>

                    <div className='hidden sm:flex'>
                      <Link
                        className='rounded-md hover:bg-gray-200 px-5 py-2.5 text-sm font-medium text-teal-600'
                        to='/register'>
                        Register
                      </Link>
                    </div>
                  </div>

                  <div className='block md:hidden'>
                    <button className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M4 6h16M4 12h16M4 18h16'
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <Link to={"/profile"} className='profile rounded-full'>
                  {!user ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                      />{" "}
                    </svg>
                  ) : (
                    <img
                      className='avatar w-8 h-8 rounded-full'
                      src={`http://localhost:2000/images/avatar/${user?.avatar.filename}`}
                      alt='profile'
                    />
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
