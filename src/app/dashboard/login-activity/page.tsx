"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, User, Activity, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

// Import utilities
import { formatIndonesianDateTime, formatDateForCSV } from "@/lib/date-utils";
import { fetchData, calculateLoginStats } from "@/lib/api";
import { LoginActivity } from "@/types/supabase";

export default function LoginActivityPage() {
  const [activities, setActivities] = useState<LoginActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
    successRate: 0,
    failureRate: 0,
  });

  const fetchLoginActivities = async () => {
    try {
      setLoading(true);
      const { data, error } = await fetchData<LoginActivity[]>(
        "/api/login-activity"
      );

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (data && data.length > 0) {
        data.forEach((activity, index) => {
          console.log(`📝 Activity ${index + 1}:`, {
            id: activity.id,
            userId: activity.userId,
            user: activity.user,
            hasUser: !!activity.user,
            userNama: activity.user?.nama,
            userUsername: activity.user?.username,
          });
        });
      }

      setActivities(data || []);

      // Hitung stats menggunakan utility function
      const calculatedStats = calculateLoginStats(data || []);
      setStats(calculatedStats);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginActivities();
  }, []);

  const getStatusBadge = (status: string) => {
    return status === "Success" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        Berhasil
      </Badge>
    ) : (
      <Badge variant="destructive">Gagal</Badge>
    );
  };

  const exportToCSV = () => {
    const headers = ["User", "Username", "Tanggal", "Status"];
    const csvData = activities.map((activity) => [
      activity.user?.nama || "User Tidak Ditemukan",
      activity.user?.username || "unknown",
      formatDateForCSV(activity.tanggal), // Gunakan utility function
      activity.status === "Success" ? "Berhasil" : "Gagal",
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `login-activity-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Memuat data...</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Login Activity</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Login Activity</h1>
              </div>
              <p className="text-muted-foreground">
                Monitor aktivitas login pengguna sistem
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={fetchLoginActivities}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={exportToCSV} disabled={activities.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Login
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Total aktivitas login
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Login Berhasil
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.success}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.successRate.toFixed(1)}% success rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Login Gagal
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.failed}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.failureRate.toFixed(1)}% failure rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Login</CardTitle>
              <CardDescription>Riwayat login pengguna terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Tidak ada data login activity
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Tanggal & Waktu (WIB)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">User ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {activity.user ? (
                                activity.user.nama
                              ) : activity.userId ? (
                                <span className="text-orange-600">
                                  User ID: {activity.userId}{" "}
                                  <span className="text-xs">
                                    (Tidak Ditemukan)
                                  </span>
                                </span>
                              ) : (
                                <span className="text-gray-500">
                                  Unknown User
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {activity.user
                                ? `@${activity.user.username} • ${activity.user.role}`
                                : activity.userId
                                ? `User ID: ${activity.userId} • Role: Unknown`
                                : "Login attempt tanpa user"}
                            </div>
                            {!activity.user && activity.userId && (
                              <div className="text-xs text-orange-600 mt-1">
                                ⚠️ User mungkin sudah dihapus dari database
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatIndonesianDateTime(activity.tanggal)}
                        </TableCell>
                        <TableCell>{getStatusBadge(activity.status)}</TableCell>
                        <TableCell className="text-right">
                          {activity.userId || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
