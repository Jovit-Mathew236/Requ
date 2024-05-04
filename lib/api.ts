// Define the base URL for your API
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to perform fetch operations
async function fetchAPI<T>(endpoint: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
}

// Define the API object with methods
const api = {
  signup: async (data: any) => {
    return await fetchAPI("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  users: async () => {
    return await fetchAPI("/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default api;
