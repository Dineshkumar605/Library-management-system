const API_BASE = "http://localhost:8080/LMS";

export async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (response.status === 404) return { data: null, error: "Not found" };
  const data = await response.json();
  if (!response.ok) return { data: null, error: data.message || "Request failed" };
  return { data, error: null };
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) return { data: null, error: data.message || "Request failed" };
  return { data, error: null };
}

export async function apiPut(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) return { data: null, error: data.message || "Request failed" };
  return { data, error: null };
}

export async function apiDelete(path) {
  const response = await fetch(`${API_BASE}${path}`, { method: "DELETE" });
  const text = await response.text();
  if (!response.ok) return { data: null, error: text || "Delete failed" };
  return { data: text, error: null };
}

export { API_BASE };
