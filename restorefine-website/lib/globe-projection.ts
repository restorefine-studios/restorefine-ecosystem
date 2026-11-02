/* The orthographic projection lib/uk-globe.ts was generated with (d3-geo
 * geoOrthographic().rotate([3, -6]).scale(2000).translate([600, 2040])), so any
 * lat/lon can be placed on the same globe. */
const R = 2000;
const LON0 = -3;
const LAT0 = 6;
const TX = 600;
const TY = 2040;
const rad = Math.PI / 180;

/** Rounded so server and browser agree to the last digit */
export function projectToGlobe(lat: number, lon: number) {
  const phi = lat * rad;
  const dl = (lon - LON0) * rad;
  const phi0 = LAT0 * rad;
  const x = TX + R * Math.cos(phi) * Math.sin(dl);
  const y = TY - R * (Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * Math.cos(phi) * Math.cos(dl));
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}
