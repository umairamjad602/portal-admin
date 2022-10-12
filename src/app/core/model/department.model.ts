export interface DepartmentsResponse {
    departments?: DepartmentPager;
    message?: string;
}
export interface DepartmentPager {
    current_page: number;
    data: Department[];
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
}
export interface DepartmentResponse {
    department?: Department;
    message?: string;
}
export interface Department {
    id: number;
    name: string;
    office_id: number;
    manager_id: number;
    info: string;
    page?: number;
    per_page?: number;
    sort?: string;
    sort_by?: string;
    office: Office;
}


export interface Office {
    id: number;
    name: string;
}



export interface DepartmentFilters {
    name?: string;
    office_id?: number;
    brand_id?: number;
    info?: string;
    page?: number;
    per_page?: number;
    sort?: string;
    sort_by?: string;
}
