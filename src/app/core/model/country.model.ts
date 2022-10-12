export interface Country {
    id: number;
    type_id: number;
    name: string;
    short_name?: string | null;
    description: string;
}
