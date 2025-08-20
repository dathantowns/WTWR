export function checkToken(token) {
  return fetch("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Token is invalid or expired");
    }
    return response.json();
  });
}
// Utility functions for authentication API requests

export function register({ name, avatar, email, password }) {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return response.json();
  });
}

export function login({ email, password }) {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      return res;
    });
}
