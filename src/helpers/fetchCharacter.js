export default async function fetchCharacter(travelerName, data) {
  try {
    const cachedTraveler = data?.travelers?.find(
      (t) => t.slug === travelerName
    );

    if (cachedTraveler) {
      console.log(cachedTraveler);
      return cachedTraveler;
    }

    const res = await fetch(
      `https://api.octopathhandbook.com/travelers/${travelerName}`
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const responseData = await res.json();
    const travelerData = responseData.data;

    const avatarUrl = `https://api.octopathhandbook.com/icons/avatars/${travelerData.name
      .replace(/\s+/g, "_")
      .replace(/'/g, "_")}_Sprite.webp`;

    const typesUrls = travelerData.types.map((type) => {
      return {
        url: `https://api.octopathhandbook.com/icons/types/Type_${type}.webp`,
        filename: `Type_${type}.webp`,
        type,
      };
    });

    return {
      ...travelerData,
      avatar: avatarUrl,
      typesUrls,
    };
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
}
