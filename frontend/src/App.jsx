import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Register from "./component/Register";
import Login from "./component/Login";
import Header from "./component/Header";
import { useContext, useEffect } from "react";
import { PostContext, UserContext } from "./context/CreateContext";
import Profile from "./component/Profile";

function App() {
  const { user, Profile: UserProfile, AllUser } = useContext(UserContext);
  const { AllPosts } = useContext(PostContext);

  useEffect(() => {
    if (!user) {
      UserProfile();
    }
    AllUser();
    AllPosts();
  }, []);

  return (
    <>
      <div className=''>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />

          {/* Auth: */}
          <Route
            path='/register'
            element={user ? <Navigate to={"/"} /> : <Register />}
          />
          <Route
            path='/login'
            element={user ? <Navigate to={"/"} /> : <Login />}
          />

          {/* Profile */}
          <Route
            path='/profile'
            element={!user ? <Navigate to={"/login"} /> : <Profile />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
