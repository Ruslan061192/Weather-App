const showPosition = (position: GeolocationPosition) => {
    position.coords.latitude;
    position.coords.longitude;
};

export const getLocation = () => {
    return (navigator.geolocation) ? navigator.geolocation.getCurrentPosition(showPosition) : console.log("Non support");
};