// import { Coords } from './../../types/weatherTypes';
import { StateCreator } from "zustand";
import { GetWeatherData } from "../../axios/services/weatherService";
import { IWeather } from "../../types/weatherTypes";

export interface IGetCurrentCoordsSlice {
    isError: string | null;

    isLoading: boolean;

    currentWeather: IWeather | null;

    coords: {
        lat: number | null;
        lon: number | null;
    };
    getCurrentCoords: () => Promise<void>;

}




export const getCurrentCoordsSlice: StateCreator<IGetCurrentCoordsSlice, [], [], IGetCurrentCoordsSlice> = (set) => ({
    isLoading: false,
    isError: null,
    currentWeather: null,
    coords: { lat: null, lon: null },

    getCurrentCoords: async () => {
        set({ isLoading: true, isError: null });

        const getCurrentPosition = async (): Promise<GeolocationPosition> => {
            return new Promise<GeolocationPosition>((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation is not supported by your browser'));
                    return;
                }

                const options: PositionOptions = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                };

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (!position?.coords?.latitude || !position?.coords?.longitude) {
                            reject(new Error('Invalid position data received'));
                            return;
                        }
                        resolve(position);
                    },
                    (error) => {
                        let errorMessage = 'Geolocation error: ';

                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage += 'User denied the request for geolocation';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage += 'Location information is unavailable';
                                break;
                            case error.TIMEOUT:
                                errorMessage += 'The request to get user location timed out';
                                break;
                            default:
                                errorMessage += 'Unknown error occurred';
                        }

                        reject(new Error(errorMessage));
                    },
                    options
                );
            });
        };

        try {
            // const position = await new Promise<GeolocationPosition>(
            //     (resolve, reject) => {
            //         navigator.geolocation.getCurrentPosition(resolve, reject);
            //     }
            // );

            const position = await getCurrentPosition();
            const currentData = await GetWeatherData.getWeather(
                position.coords.latitude, position.coords.longitude

            );

            set({
                currentWeather: currentData.data,
                coords: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                isLoading: false,
            });

        } catch (error: unknown) {
            set({
                isError:
                    error instanceof Error ? error.message : "Unknown message!",
                isLoading: false,
            });
        }
    },

})