export default async function fetchCharacters() {
  try {
    const res = await fetch(
      "https://cotc-travelers-backend.onrender.com/travelers"
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data: ", error.message);
    return null;
  }
}
