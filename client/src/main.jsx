import React from 'react'
import ReactDOM from 'react-dom/client';
import "@/components/app/index.scss";
import {Auth, Calendars, Dashboard, Notes, Notifications} from "@/components/pages";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import {ConfigProvider} from 'antd';
import {Provider} from "react-redux";
import {store} from "@/lib/store.js";
import {ProtectedRoute} from "@/components/layouts/protected-route.jsx";
import {DashboardLayout} from "@/components/layouts/dashboardLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => redirect("/dashboard")
  },
  {
    path: "/auth",
    element: <Auth/>,
  },
  {
    path: "/dashboard",
    element:
      <ProtectedRoute>
        <DashboardLayout>
          <Dashboard/>
        </DashboardLayout>
      </ProtectedRoute>,
  },
  {
    path: "/calendars",
    element:
      <ProtectedRoute>
        <DashboardLayout>
          <Calendars/>
        </DashboardLayout>
      </ProtectedRoute>,
  },
  {
    path: "/notes",
    element:
      <ProtectedRoute>
        <DashboardLayout>
          <Notes/>
        </DashboardLayout>
      </ProtectedRoute>,
  },
  {
    path: "/notifications",
    element:
      <ProtectedRoute>
        <DashboardLayout>
          <Notifications/>
        </DashboardLayout>
      </ProtectedRoute>,
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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </ConfigProvider>
);