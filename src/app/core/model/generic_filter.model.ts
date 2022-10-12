export interface GenericFilter {
    name?: string;
    param_1?: string;
    param_2?: string;
    page?: number;
    per_page?: number;
    sort?: string;
    sort_by?: string;
    token?: string;
    type?: string;
    created_from?: Date;
    created_until?: Date;
    client_id?:number;
    from?: string;
    to?:string
    date?:string;
    until?: string;
    module_id?: number;
    relation_id?: number;
    invoice_number?: number;
    name_or_code?: string;
    currency?: string;
    desk?: number;
    country?: number;
}

