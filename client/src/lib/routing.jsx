import {createBrowserRouter, redirect} from "react-router-dom";
import {Auth, Calendars, Dashboard, Notes, Notifications} from "@/components/pages";
import {ProtectedRoute} from "@/components/layouts/protected-route";
import {DashboardLayout} from "@/components/layouts/dashboard-layout";
import React from "react";

export const router = createBrowserRouter([
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