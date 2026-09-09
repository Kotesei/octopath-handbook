export async function updateViewCount(slug) {
  try {
    const response = await fetch(
      `https://api.octopathhandbook.com/travelers/${slug}/views`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update view count");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating view count:", err);
  }
}
