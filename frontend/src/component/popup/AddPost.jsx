import { useContext, useState } from "react";
import { PostContext } from "../../context/CreateContext";

function AddPost() {
  const {
    addPopUp,
    setAddPopUp,
    AddPost: AddPostRequest,
  } = useContext(PostContext);

  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
  };

  const postHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("post", postImage);
    formData.append("caption", caption);

    AddPostRequest(formData);
  };

  return (
    addPopUp && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white min-w-[30rem] p-8 rounded-md space-y-3'>
          <div className='flex justify-between items-center flex-col'>
            <div className='flex justify-between w-full'>
              <h2 className='text-2xl font-bold mb-4'>Add New Post</h2>
              <button
                onClick={() => setAddPopUp(false)}
                className='px-2 -mt-5 hover:cursor-pointer'>
                Close
              </button>
            </div>

            <form onSubmit={postHandler} className='w-full'>
              <input
                type='file'
                onChange={onFileChange}
                className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed'
                name='file'
              />
              <input
                type='text'
                className='block border border-grey-light w-full p-3 rounded mb-4 focus:outline-dashed'
                name='fullname'
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                placeholder='Caption'
              />

              <button
                type='submit'
                className='border px-4 py-1 rounded-md hover:bg-green-700 w-full bg-green-500 text-white font-medium'>
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default AddPost;
