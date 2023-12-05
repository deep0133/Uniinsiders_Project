import PropTypes from "prop-types";
function FollowerList({ isOpen, closePopup, name = "Name of Person" }) {
  return (
    <div>
      {isOpen.status && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white min-w-[30rem] p-8 rounded-md space-y-3'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold mb-4'>{isOpen.pop}</h2>
              <button onClick={closePopup} className='px-2'>
                Close
              </button>
            </div>
            <div className='user flex gap-3 items-center text-xl font-medium bg-gray-100 p-3 rounded-md border-collapse'>
              <img
                alt='Developer'
                src='https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
                className='h-12 w-12 rounded-full object-cover'
              />
              <h2>{name}</h2>
            </div>
            <div className='user flex gap-3 items-center text-xl font-medium bg-gray-100 p-3 rounded-md border-collapse'>
              <img
                alt='Developer'
                src='https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
                className='h-12 w-12 rounded-full object-cover'
              />
              <h2>{name}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

FollowerList.propTypes = {
  name: PropTypes.string,
  isOpen: PropTypes.object,
  closePopup: PropTypes.func,
};

export default FollowerList;
