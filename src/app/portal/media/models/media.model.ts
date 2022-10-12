export interface Document {
    media_id: number;
    relation_id: string;
    module: string;
    updated_at: Date;
    created_at: Date;
    id: number;
}



export interface MediaRelation {
    id: number;
    media_id: number;
    module_id: number;
    relation_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
    media: Media;
}
export interface Media {
    id?: number;
    uri?: string;
    file_name: string;
    media_title: string;
    media_alt_text: string;
    media_description: string;
    media_directory_id?: any;
    media_mime_type: string;
    media_size: number;
    media_extension: string;
    media_is_image: number;
    relation_id: string;
    media_type: number;
    thumbnails: string[];
    media_width: number;
    media_height: number;
    is_default: boolean;
    result: string;
    media_id: number;
    path_media_drive: string;
    path_media_drive_cache: string;
    document: Document;
    type: MediaType;
}

export interface MediaUploadResponse {
    message: string;
    media: Media;
}

export interface MediaType {
    id: number;
    name: string;
    short_name: string;
    description: string;
    sort_order: number;
    created_at: Date;
    updated_at: Date;
}

export interface MediasReponse {
    media: MediasPager;
}

export interface MediaFilter {
    page: number;
    per_page?: number;
    file_name?: string;
    module_id?: number;
    relation_id?: number;
    created_from?: Date;
    created_until?: Date;
    from?: string;
    until?: string;
};

export interface MediasPager {
    current_page: number;
    data: Media[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
};

export interface DataImportEntity {
    file_id?: number;
    header?: any;
    module_id?: number;
};


export interface DataImortParseResults {
    csv_filename: string;
    csv_header: boolean;
    csv_header_fields: string;
    csv_data: string;
    updated_at: Date;
    created_at: Date;
    id: number;
}


export enum MediaTypesEnum {
    GeneralFiles     = 1,
    Logo             = 2,
    InvoicesPDF      = 3,
    InvoiceLogo      = 4,
    CompanyLogo      = 5,
    ProfilePicture   = 6
}
