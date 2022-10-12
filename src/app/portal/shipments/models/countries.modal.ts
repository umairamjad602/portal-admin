export interface Country {
    id: number;
    iso: string;
    name: string;
    nicename: string;
    phonecode: number;
}

export interface CountriesResponse {
    countries: Country[];
}