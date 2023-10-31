import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../src/css/app.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SurveyForm from './components/FormComponents/SurveyForm.tsx';
import ErrorPage from './components/ToolComponents/ErrorPage.tsx';
import Login from './components/AuthComponents/Login.tsx';
import Register from './components/AuthComponents/Register.tsx';
import Stats from './components/StatsComponents/Stats.tsx';
import WeightVersionForm from './components/WeightVersionComponents/WeightVersionForm.tsx';
import SurveyPage from './components/QuestionComponents/SurveySelect.tsx';
import ToastProvider from './components/Contexts/ToastContext.tsx';

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
        element: <SurveyPage />
      },
      {
        path: "survey/:projectId",
        element: <SurveyForm />,
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
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>,
)
