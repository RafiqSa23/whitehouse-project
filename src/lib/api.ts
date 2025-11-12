export async function loginUser(username: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  return { status: res.status, data };
}

export async function logoutUser() {
  const res = await fetch("/api/logout", {
    method: "POST",
  });
  if (!res.ok) {
    return {
      status: res.status,
      data: { error: "Logout failed" },
    };
  }
  const data = await res.json();
  return { status: res.status, data };
}

// date time format helper
export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: errorData.error || `HTTP error! status: ${response.status}`,
      };
    }

    const result = await response.json();
    return { data: result.data || result, error: null };
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Terjadi kesalahan",
    };
  }
}

export function calculateLoginStats(activities: Array<{ status: string }>) {
  const total = activities.length;
  const success = activities.filter((a) => a.status === "Success").length;
  const failed = total - success;

  return {
    total,
    success,
    failed,
    successRate: total > 0 ? (success / total) * 100 : 0,
    failureRate: total > 0 ? (failed / total) * 100 : 0,
  };
}
