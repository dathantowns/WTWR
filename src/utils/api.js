export function requestApiItems() {
  const baseUrl = "http://localhost:3001";
  return fetch(`${baseUrl}/items`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`Error: ${res.status}`);
  });
}
