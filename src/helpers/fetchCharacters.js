export default async function fetchCharacters() {
  try {
    const res = await fetch("https://api.octopathhandbook.com/travelers");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    const travelers = data.data;

    const uniqueGenders = new Set();
    const uniqueTypes = new Set();

    travelers.forEach((traveler) => {
      if (traveler.gender) uniqueGenders.add(traveler.gender.toLowerCase());
      if (Array.isArray(traveler.types))
        traveler.types.forEach((type) => uniqueTypes.add(type));
    });

    const travelersWithAvatars = travelers.map((traveler) => ({
      ...traveler,
      avatar: `https://api.octopathhandbook.com/icons/avatars/${traveler.name
        .replace(/\s+/g, "_")
        .replace(/'/g, "_")}_Sprite.webp`,
    }));

    const iconUrls = {
      genders: Array.from(uniqueGenders).map((icon) => ({
        url: `https://api.octopathhandbook.com/icons/genders/${icon}.svg`,
        filename: `${icon}.svg`,
      })),
      types: Array.from(uniqueTypes).map((icon) => ({
        url: `https://api.octopathhandbook.com/icons/types/Type_${icon}.webp`,
        filename: `Type_${icon}.webp`,
      })),
    };

    const allImageUrls = [
      ...iconUrls.genders.map((g) => g.url),
      ...iconUrls.types.map((t) => t.url),
      ...travelersWithAvatars.map((t) => t.avatar),
    ];

    const imageBlobs = await fetchAllAsBlobs(allImageUrls);
    const blobCache = {};
    allImageUrls.forEach((url, index) => {
      blobCache[url] = URL.createObjectURL(imageBlobs[index]);
    });

    const travelersWithBlobAvatars = travelersWithAvatars.map((traveler) => ({
      ...traveler,
      avatar: blobCache[traveler.avatar],
    }));

    const iconsWithBlobs = {
      genders: iconUrls.genders.map((g) => ({
        ...g,
        url: blobCache[g.url],
      })),
      types: iconUrls.types.map((t) => ({
        ...t,
        url: blobCache[t.url],
      })),
    };

    return {
      travelers: travelersWithBlobAvatars,
      types: iconsWithBlobs.types,
      genders: iconsWithBlobs.genders,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function fetchAllAsBlobs(urls) {
  const promises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to fetch image: ${url}`);
        return new Blob();
      }
      return await response.blob();
    } catch (err) {
      console.warn(`Error fetching image ${url}:`, err);
      return new Blob();
    }
  });

  return Promise.all(promises);
}
