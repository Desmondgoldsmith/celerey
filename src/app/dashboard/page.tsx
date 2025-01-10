"use client";

import { DashboardLayout } from "@/Features/userDashboard/components/templates/dashboardLayout";
import DashboardTemplate from "@/Features/userDashboard/components/templates/dashboardTemplate";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardTemplate />
    </DashboardLayout>
  );
}
