export interface Permission {
  module_id: number;
  id: number;
  module: string;
  type: string;
  permission: string;
}

export interface Module {
  id: number;
  name: string;
  permission?: Permission[];
}

export interface Profile {
  id?: number;
  created_by?: number;
  name?: string;
  description?: string;
  attributes?: string;
  created_at?: Date;
  updated_at?: Date;
  permissions?: Permission[];
  profile_id?: number;
  pivot?: Pivot;
  length?: number;
}

export interface ProfileFilter {
  page?: number;
  per_page?: number;
}



export interface PermissionsResponse {
  data: Profile[];
  links?: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  message?: string;
}

export interface PermissionResponse {
  profile: Profile;
  message?: string;
}

export interface Permission {
  permission_id: number;
  name: string;
  type: string;
  pivot: Pivot;
}

export interface Pivot {
  profile_id: number;
  permission_id: number;
}


// Roles Model Start

export interface Role {
  id?: number;
  created_by?: any;
  is_assigned_to_all?: number;
  name?: string;
  slug?: any;
  description?: any;
  status?: string;
  is_shared?: boolean;
  profile_ids?: number[];
  created_at?: Date;
  updated_at?: Date;
  profiles?: Profile[];
}

export interface AssignedRole extends Role {
  role_name?: string;
  role_id: number;
  permissions: Permission[][];
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface RoleFilter {
  page: number;
  per_page: number;
}

export interface RolesPagination {
  current_page: number;
  data: Role[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface RolesResponse {
  data: Role[];
  links?: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  message?: string;
}
export interface RoleResponse {
  role: Role;
  message: string;
}

export interface Pivot {
  role_id: number;
  profile_id: number;
}
