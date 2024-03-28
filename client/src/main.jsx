import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/components/app';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import { Auth } from './components/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
        borderRadius: 50,
        colorBgContainer: '#f6ffed',
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);