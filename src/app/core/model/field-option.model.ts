import { RecordState } from "./record-state.model";

export interface FieldOptionTypes {
    [index: number]: FieldOptionType;
}

export enum FieldOptionTypeEnum {
    Currencies = 20
}

export interface FieldOptionType {
  id: number;
  type_description: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
  fieldOptions: FieldOption[];
}

export interface FieldOption {
  id?: number;
  type_id?: number;
  name?: string;
  short_name?: string;
  description?: string;
  sort_order?: number;
  recordState?: RecordState;
  type_description?: string;
}
