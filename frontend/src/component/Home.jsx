import Post from "./Post";
import User from "./User";
import { useContext, useState } from "react";
import FollowerList from "./popup/FollowerList";
import { PostContext, UserContext } from "../context/CreateContext";

function Home() {
  const [isOpen, setIsOpen] = useState({ status: false, pop: "" });

  const openPopup = (str) => {
    setIsOpen({ status: true, pop: str });
  };

  const closePopup = () => {
    setIsOpen({ status: false, pop: "" });
  };

  const { userList } = useContext(UserContext);
  const { post } = useContext(PostContext);

  const [showUserList, setShowList] = useState(userList);

  // -------------Pending-------------
  const filterUserByName = () => {
    console.log("----------Pending-------");
  };

  return (
    <div className=''>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='grid relative grid-cols-12 gap-3'>
          <div className='col-span-9 border-2'>
            {post.length > 0 &&
              post.map((val, index) => {
                return (
                  <Post key={index} currentPost={val} openPopup={openPopup} />
                );
              })}
          </div>
          <div className='col-span-3 border'>
            <div className='sticky top-0'>
              <div className='sticky top-0 bg-gray-200 p-3 font-medium my-2 px-2 text-xl'>
                Users
              </div>
              {showUserList.length > 0 &&
                showUserList.map((val, index) => {
                  console.log(index + " : " + val);
                  return (
                    <User key={index} currentUser={val} openPopup={openPopup} />
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* popup for showing - followers: */}
      <FollowerList isOpen={isOpen} closePopup={closePopup} />
    </div>
  );
}

export default Home;
