import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { Children } from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDashboard } from './Pages/UserDashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { UserProfile } from './Pages/UserProfile';
import { UserProvider } from './context/UserProvider';
import { ChangePassword } from './Pages/ChangePassword';
import OTPInputBox from './components/OTPInputBox';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login", 
    element: <Login />
  },
  {
    path: "/signup", 
    element: <SignUp />
  },
  {
    path: "/user",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        path: "profile/:userId", 
        element: <UserProfile />
      },
      {
        index: true,
        path: "change-password", 
        element: <ChangePassword />
      },
      {
        index: true,
        path: "dashboard", 
        element: <UserDashboard />
      }
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
