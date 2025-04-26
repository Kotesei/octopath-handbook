export default async function fetchCharacters() {
  try {
    // Step 1: Fetch traveler data
    const res = await fetch("https://api.octopathhandbook.com/travelers");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const travelers = data.data;

    // Step 2: Fetch the avatars for each traveler and add the image URL to the traveler data
    const travelersWithAvatars = await Promise.all(
      travelers.map(async (traveler) => {
        const avatarUrl = `https://api.octopathhandbook.com/avatars/${traveler.name
          .replace(/\s+/g, "_")
          .replace(/'/g, "_")}_Sprite.webp`; // Construct the avatar image URL

        // Fetch the avatar image
        const avatarRes = await fetch(avatarUrl);
        let avatarImage = null; // Default to no image

        if (avatarRes.ok) {
          const imageBlob = await avatarRes.blob(); // Convert the image to a Blob
          avatarImage = URL.createObjectURL(imageBlob); // Create an Object URL from the Blob
        }

        // Return traveler data with the image URL
        return {
          ...traveler,
          avatar: avatarImage, // Add the avatar image URL (or null if not found)
        };
      })
    );

    return travelersWithAvatars; // Return the list of travelers with avatars
  } catch (error) {
    console.error("Error fetching data: ", error.message);
    return null;
  }
}
