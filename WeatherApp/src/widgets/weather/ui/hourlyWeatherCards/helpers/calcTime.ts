export const calcTime = (time:string, code:number) => {
              const hours = new Date(time)
              .getHours()
              .toString()
              .padStart(2, "0");
              const minutes = new Date(time)
              .getMinutes()
              .toString()
              .padStart(2, "0");
              const formattedTime = `${hours}:${minutes}`;
              const changeIcon = calcWeatherIcons(code);
              
              return {
                changeIcon,
                formattedTime
              };
            }


const icons = {
    "Sunny": "../../../public/icons/32_Sunny.svg",
    "Few Clouds": "../../../public/icons/32_Few-Clouds.svg",
    "Fog": "../../../public/icons/32_Fog.svg",
    "Shower Rain & Sun": "../../../public/icons/32_Shower-Rain&Sun.svg",
    "Thunderstorm": "../../../public/icons/32_Thunderstorm.svg",
    "Snow": "../../../public/icons/32_Snow.svg",
}

const data = [
    {code: [1000], icons: icons["Sunny"]},
    {code: [1003, 1006, 1009], icons: icons["Few Clouds"]},
    {code: [1030, 1135, 1147, 1180, 1183, 1186], icons: icons["Fog"]},
    {code: [1063, 1150, 1153, 1168, 1171, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1249, 1183], icons: icons["Shower Rain & Sun"]},
    {code: [1087, 1273, 1276, 1279, 1282], icons: icons["Thunderstorm"]},
    {code: [1114, 1066, 1069, 1072, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1252, 1255, 1258, 1261, 1264], icons: icons["Snow"]},   
]

export function calcWeatherIcons(weatherCode?: number) {
    return weatherCode && typeof weatherCode === "number" ? 
        data.find(item => item.code.includes(weatherCode))?.icons : 
        '';
}