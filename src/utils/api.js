export const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const baseUrl = "http://localhost:3001";

export function requestApiItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => checkRes(res));
}

export function deleteApiItem(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => checkRes(res));
}

export function addApiItem(card) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(card),
  }).then((res) => checkRes(res));
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkRes(res));
}

export function updateUserData(token, data) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => checkRes(res));
}

export function likeItem(cardId) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => checkRes(res));
}

export function dislikeItem(cardId) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  }).then((res) => checkRes(res));
}

export const getToken = () => localStorage.getItem("jwt");
