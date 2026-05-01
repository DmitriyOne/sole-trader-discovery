type TGoogleFontOptions = {
  family: string;
  weight: number;
  italic?: boolean;
  text: string;
};

export async function loadGoogleFont({
  family,
  weight,
  italic = false,
  text,
}: TGoogleFontOptions): Promise<ArrayBuffer> {
  const familyParam = family.replace(/ /g, "+");
  const italParam = italic ? "1" : "0";
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}:ital,wght@${italParam},${weight}&text=${encodeURIComponent(text)}`;

  // Old Firefox UA forces Google Fonts to serve TTF (Satori-friendly)
  // instead of WOFF2.
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64; rv:1.0) Gecko/20100101 Firefox/1.0",
    },
  }).then((res) => res.text());

  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) {
    throw new Error(
      `loadGoogleFont: could not extract font URL for ${family} ${weight}${italic ? "i" : ""}`
    );
  }

  return fetch(match[1]).then((res) => res.arrayBuffer());
}
