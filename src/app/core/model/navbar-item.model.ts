import { UserAccessGroupEnum } from "./groups.model";

export interface NavbarItem {
  id?: number;
  title?: string;
  link?: string;
  icon?: string;
  subMenu?: NavbarItem[];
  type?: NavItemType;
  isDBOnlyModule?: boolean;
  accessLevel?: UserAccessGroupEnum[];
}


export enum NavItemType {
  Menu,
  NavTitle
}
