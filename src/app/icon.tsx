import { ImageResponse } from 'next/og';
import { city } from '@/config/city';

// Generates the browser-tab favicon as a PNG (broadly supported, unlike an
// SVG favicon which some browsers — e.g. Safari — refuse to show in the tab):
// a red rounded square with a white "H" for Herdecke.
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: city.flag.stripes[0],
          color: '#ffffff',
          fontSize: 23,
          fontWeight: 700,
          borderRadius: 7,
        }}
      >
        {city.faviconLetter}
      </div>
    ),
    size,
  );
}
