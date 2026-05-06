// src/utils/mapbox.util.ts
import { envs } from '../config/envs';

export const generateMapBoxStaticImage = (
    lostLat: number,
    lostLng: number,
    foundLat: number,
    foundLng: number,
): string => {
    const accessToken = envs.MAPBOX_TOKEN;
    const width = 800;
    const height = 600;

    // Pin rojo (l de lost) y pin verde (f de found)
    // Formato: pin-tamaño-letra+color(longitud,latitud)
    const markers = `pin-s-l+f00(${lostLng},${lostLat}),pin-s-f+0f0(${foundLng},${foundLat})`;

    // Usamos 'auto' en lugar de coordenadas/zoom para que encuadre ambos puntos
    return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${markers}/auto/${width}x${height}?access_token=${accessToken}&padding=50`;
};
