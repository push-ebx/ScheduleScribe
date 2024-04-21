import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/components/app';
import { Dashboard } from '@/components/dashboard'
import {
  createBrowserRouter, redirect,
  RouterProvider
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import { Auth } from './components/auth';
import {Calendars} from "@/components/calendars/index.jsx";
import {Notifications} from "@/components/notifications/index.jsx";
import {Notes} from "@/components/notes/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => redirect("/dashboard")
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/calendars",
    element: <Calendars />,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#ff0025',
        borderRadius: 10,
        colorBgContainer: '#f3f3f3',
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);