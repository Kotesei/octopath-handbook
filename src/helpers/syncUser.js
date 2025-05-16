export default async function syncUser() {
  try {
    const user = await fetch("https://api.octopathhandbook.com/profile", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!user.ok) throw new Error(`HTTP error! status: ${user.status}`);
    const userData = await user.json();
    return userData;
  } catch (error) {
    // console.error("Failed to fetch user:", error);
    return { failed: true };
  }
}
