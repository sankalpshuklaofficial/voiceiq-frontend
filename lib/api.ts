const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("access_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Something went wrong");
  }

  return response.json();
}

export const api = {
  auth: {
    register: (data: any) =>
      apiRequest("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data: any) =>
      apiRequest("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
    me: () => apiRequest("/api/auth/me"),
  },
  business: {
    getAll: () => apiRequest("/api/business/"),
    getTypes: () => apiRequest("/api/business/types"),
    create: (data: any) =>
      apiRequest("/api/business/", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: any) =>
      apiRequest(`/api/business/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },
  calls: {
    getAll: (businessId: number) =>
      apiRequest(`/api/calls/?business_id=${businessId}`),
    getAnalytics: (businessId: number) =>
      apiRequest(`/api/calls/analytics/overview?business_id=${businessId}`),
  },
  appointments: {
    getAll: (businessId: number) =>
      apiRequest(`/api/appointments/?business_id=${businessId}`),
    create: (data: any) =>
      apiRequest("/api/appointments/", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: any) =>
      apiRequest(`/api/appointments/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: number) =>
      apiRequest(`/api/appointments/${id}`, { method: "DELETE" }),
  },
};