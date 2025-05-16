export default async function favoriteCharacter(id) {
  try {
    await fetch("https://api.octopathhandbook.com/favorite", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        travelerId: id,
      }),
    });

    return { success: true };
  } catch (error) {
    return { failed: true };
  }
}
