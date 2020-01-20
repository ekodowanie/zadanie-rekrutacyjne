export interface UserInterface {
    name: string;
    street: string;
    postCode: string;
    town: string;
    state: string;
}

export interface PlaceInterface {
    long_name: string;
    short_name: string;
    types: string[];
}