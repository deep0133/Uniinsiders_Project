import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function User({ openPopup, currentUser }) {
  return (
    <div className='user-list p-3 bg-gray-100'>
      <div className='flex items-center gap-4'>
        <img
          alt='Developer'
          src={
            currentUser &&
            `http://localhost:2000/images/avatar/${currentUser?.avatar?.filename}`
          }
          className='h-10 w-10 rounded-full object-cover'
        />

        <div>
          <Link to='/profile' className='text-lg font-medium '>
            {currentUser?.name}
          </Link>

          <div className='flow-root'>
            <ul className='-m-1 flex flex-wrap'>
              <li className='p-1 leading-none'>
                <button
                  onClick={() => {
                    openPopup("Followers");
                  }}
                  className='text-xs font-medium text-gray-500'>
                  Followers
                </button>
              </li>

              <li className='p-1 leading-none'>
                <button
                  onClick={() => {
                    openPopup("Following");
                  }}
                  className='text-xs font-medium text-gray-500'>
                  Following
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

User.propTypes = {
  openPopup: PropTypes.func,
  currentUser: PropTypes.object,
};
