import User from "./User";
import PropTypes from "prop-types";
export default function Post({ openPopup, currentPost }) {
  return (
    <div className='bg-white mt-3 p-5 pb-10'>
      <div className='post-detail'>
        <User openPopup={openPopup} currentUser={currentPost?.owner} />
      </div>
      <img
        className='borNameder rounded-t-lg shadow-lg '
        src={
          currentPost &&
          `http://localhost:2000/images/post/${currentPost?.image.filename}`
        }
      />
      <div className='bg-white border shadow p-5 text-xl text-gray-700 font-semibold'>
        {currentPost?.caption}
      </div>
      <div className='bg-white p-1 border shadow flex flex-row flex-wrap'>
        <div className='w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold'>
          Like {" " + currentPost?.likes.length}
        </div>
        <div className='w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold'>
          Add Comment
        </div>
        <div className='w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold'>
          Comment {" " + currentPost?.comments?.length}
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  openPopup: PropTypes.func,
  currentPost: PropTypes.object,
};
