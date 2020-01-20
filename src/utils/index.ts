import { UserInterface, PlaceInterface } from "../types";
import { GOOGLE_API_GEOLOCATION } from "../constants/endpoints";
import { STATE } from "../constants/geolocation";

export const readFile = (filename: string): Promise<Response> => fetch(filename);
export const getLocationData = (address: string): Promise<Response> => fetch(`${GOOGLE_API_GEOLOCATION}/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
export const getPostCode = (address: string): RegExpMatchArray | null => address.match(/(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})/g);

export const parseUsersTxtToObjects = (data: string): UserInterface[] => {
    const parsedData: any[] = [];
    const users = data.split("\n\r"); 
    let counter = 0;

    users.forEach( user => {
        const userData = user.split('\n').filter( el => el !== '');
        parsedData[counter] = {
            name: userData[0],
            street: userData.length === 4 ? `${userData[1]}, ${userData[2]}` : userData[1],
            postCode: userData.length === 4 ? getPostCode(userData[3]) : getPostCode(userData[2]) ,
            town: userData.length === 4 ? userData[3].substring(6, userData[3].length) : userData[2].substring(6, userData[2].length),
        };
        counter++;
    });

    return parsedData;
};

export const getByAdministrativeLevel = (level: string, data: PlaceInterface[]): string => {
    let state = '';
    data.forEach(address => {
        address.types.forEach(type => {
            if(type === level) {
                state = address.long_name;
            }
        });
    });
    return state;
};

export const fetchUserFederalState = async (address: string): Promise<string | undefined> => {
    try {
        const { results } = await (await getLocationData(address)).json();
        if(results)
            return getByAdministrativeLevel(STATE, results[0].address_components);
    } catch(err) {
        console.log(err);
    }
};
