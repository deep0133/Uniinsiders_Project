import { useContext } from "react";
import { PostContext, UserContext } from "../context/CreateContext";
import Post from "./Post";
import AddPost from "./popup/AddPost";

export default function Profile() {
  const { user, Profile: UserProfile } = useContext(UserContext);
  const { setAddPopUp } = useContext(PostContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    UserProfile();
  };

  return (
    <div className='container mx-auto my-5 w-full flex flex-row flex-wrap '>
      <div className='w-full   bg-indigo-100 h-screen flex flex-row flex-wrap justify-center '>
        <div className='w-0 border-2 p-3  md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg'>
          <div className='p-5 bg-white shadow-md my-3 sticky top-0 border'>
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
                className='avatar rounded-md w-full '
                src={`http://localhost:2000/images/avatar/${user.avatar.filename}`}
                alt='profile'
              />
            )}
            <div className='pt-2 border-t mt-5 w-full text-center text-xl text-gray-600'>
              <h3>{user.name}</h3>
              <p className='text-sm'>{user.email}</p>
            </div>
          </div>
          <div className='w-full h-screen antialiased flex flex-col hover:cursor-pointer'>
            <div className='hover:bg-gray-300 flex justify-between bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold'>
              <button className=''>Followers</button>
              <p>{user.followers.length}</p>
            </div>
            <div className='hover:bg-gray-300 flex justify-between bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold'>
              <button className=''>Following</button>
              <p>{user.following.length}</p>
            </div>
            <div className='hover:bg-gray-300 flex justify-between bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold'>
              <button className=''>Total Posts</button>
              <p>{user.posts.length}</p>
            </div>
            <div className='hover:bg-gray-300 flex justify-between bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold'>
              <button
                onClick={() => {
                  setAddPopUp(true);
                }}
                className=''>
                Add Post
              </button>
            </div>
            <div className='hover:bg-gray-300 flex justify-between bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold'>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        </div>

        <div className='w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased'>
          <h3 className='posts text-3xl font-semibold'> Posts</h3>
          <div className='mt-3 flex flex-col'>
            {user.posts.length > 0
              ? user.posts.map((val, index) => {
                  return <Post key={index} currentPost={val} />;
                })
              : "0 Post Found"}
          </div>
        </div>
      </div>

      <AddPost />
    </div>
  );
}
