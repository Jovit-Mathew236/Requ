// Define the base URL for your API
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to perform fetch operations
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorBody = await response.text(); // or response.json() if response is in JSON format
      throw new Error(
        `API responded with status ${response.status}: ${errorBody}`
      );
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error("Fetch API error:", error);
    throw error; // Rethrow after logging or handling
  }
}

// Define the API object with methods
const api = {
  signup: async (data: any) => {
    return await fetchAPI("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  users: async () => {
    return await fetchAPI("/auth/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  roles: async () => {
    return await fetchAPI("/role", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default api;
