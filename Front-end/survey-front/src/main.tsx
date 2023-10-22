import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Form from './components/FormComponents/Form.tsx';
import FormSelect from './components/FormComponents/FormSelect.tsx';
import ErrorPage from './components/ToolComponents/ErrorPage.tsx';
import Login from './components/AuthComponents/Login.tsx';
import Register from './components/AuthComponents/Register.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <FormSelect />
      },
      {
        path: "survey/:projectId",
        element: <Form />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
