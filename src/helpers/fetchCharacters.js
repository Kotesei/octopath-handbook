export default async function fetchCharacters() {
  try {
    const res = await fetch("https://api.octopathhandbook.com/travelers");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const travelers = data.data;

    const uniqueGenders = new Set();
    const uniqueTypes = new Set();

    travelers.forEach((traveler) => {
      if (traveler.gender) {
        uniqueGenders.add(traveler.gender.toLowerCase());
      }

      if (Array.isArray(traveler.types)) {
        traveler.types.forEach((type) => uniqueTypes.add(type));
      }
    });

    const uniqueGendersArray = Array.from(uniqueGenders);
    const uniqueTypesArray = Array.from(uniqueTypes);

    const travelersWithAvatars = await Promise.all(
      travelers.map(async (traveler) => {
        const avatarUrl = `https://api.octopathhandbook.com/icons/avatars/${traveler.name
          .replace(/\s+/g, "_")
          .replace(/'/g, "_")}_Sprite.webp`;

        const avatarRes = await fetch(avatarUrl);
        let avatarImage = null;

        if (avatarRes.ok) {
          const imageBlob = await avatarRes.blob();
          avatarImage = URL.createObjectURL(imageBlob);
        }

        return {
          ...traveler,
          avatar: avatarImage,
        };
      })
    );

    const iconRes = await Promise.all([
      ...uniqueGendersArray.map((icon) =>
        fetch(`https://api.octopathhandbook.com/icons/genders/${icon}.svg`)
      ),
      ...uniqueTypesArray.map((icon) =>
        fetch(`https://api.octopathhandbook.com/icons/types/Type_${icon}.webp`)
      ),
    ]);

    const iconData = await Promise.all(
      iconRes.map(async (res, index) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch: ${res.url} - Status: ${res.status}`
          );
        }

        const fileName = res.url.split("/").pop();

        if (fileName.includes("svg")) {
          const svgText = await res.text();

          return {
            url: URL.createObjectURL(
              new Blob([svgText], { type: "image/svg+xml" })
            ),
            filename: fileName,
          };
        }

        if (fileName.includes("webp")) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          return {
            url: url,
            filename: fileName,
          };
        }
      })
    );

    const categorizedIcons = {
      genders: iconData.filter((icon) => icon.filename.includes("svg")),
      types: iconData.filter((icon) => icon.filename.includes("webp")),
    };

    const fetchedData = {
      travelers: travelersWithAvatars,
      types: categorizedIcons.types,
      genders: categorizedIcons.genders,
    };

    return fetchedData;
  } catch (error) {
    console.error("Error fetching data: ", error.message);
    return null;
  }
}
