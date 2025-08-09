const showPosition = (position: GeolocationPosition) => {
    position.coords.latitude;
    position.coords.longitude;

};

export const getLocation = () => {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        return console.log("Non support");
    }
};