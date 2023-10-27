import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Form from './components/FormComponents/Form.tsx';
import ErrorPage from './components/ToolComponents/ErrorPage.tsx';
import Login from './components/AuthComponents/Login.tsx';
import Register from './components/AuthComponents/Register.tsx';
import Stats from './components/StatsComponents/Stats.tsx';
import SurveySelect from './components/InputComponents/SurveySelect.tsx';
import WeightVersionForm from './components/WeightVersionComponents/WeightVersionForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "survey",
        element: <SurveySelect />
      },
      {
        path: "survey/:projectId",
        element: <Form />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "weight-versions",
        element: <WeightVersionForm />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
