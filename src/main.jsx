import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import AuthProvider from './components/Provider/AuthProvider.jsx';
import PrivateRoute from './components/Provider/PrivateRoute.jsx';
import Users from './components/Users.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: () => fetch('https://coffee-store-server-seven-lyart.vercel.app/coffee')
  },
  {
    path: "/addcoffee",
    element: <PrivateRoute><AddCoffee></AddCoffee></PrivateRoute>
  },
  {
    path: "/signup",
    element:  <SignUp></SignUp>

  },
  {
    path: "/signin",
    element: <SignIn></SignIn>

  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch('https://coffee-store-server-seven-lyart.vercel.app/user')

  },
  {
    path: "/updatedcoffee/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({params}) => fetch(`https://coffee-store-server-seven-lyart.vercel.app/coffee/${params.id}`)
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider> <RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
