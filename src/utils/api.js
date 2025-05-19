const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const baseUrl = "http://localhost:3001";
export function requestApiItems() {
  return fetch(`${baseUrl}/items`).then((res) => checkRes(res));
}

export function deleteApiItem(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, { method: "DELETE" }).then((res) =>
    checkRes(res)
  );
}

export function addApiItem(card) {
  return fetch(`${baseUrl}/items/${card._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  }).then((res) => checkRes(res));
}
