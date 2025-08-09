
export function calcWeatherBackground(weatherCode: number | undefined) {
    if (typeof weatherCode !== "number" || !weatherCode) return '';

    if ([1000].includes(weatherCode)) {
        return ("clear")
    } else if ([1003, 1006, 1009].includes(weatherCode)) {
        return ("cloudy")
    } else if ([1030, 1135, 1147, 1180, 1183, 1186].includes(weatherCode)) {
        return ("mist")
    } else if ([1063, 1150, 1153, 1168, 1171, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1249, 1183].includes(weatherCode)) {
        return ("rain")
    } else if ([1087, 1273, 1276, 1279, 1282].includes(weatherCode)) {
        return ("thunderstorm")
    } else if ([1114, 1066, 1069, 1072, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1252, 1255, 1258, 1261, 1264].includes(weatherCode)) {
        return ("snow")
    }
}