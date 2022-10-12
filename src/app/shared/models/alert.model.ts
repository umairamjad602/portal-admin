export interface Alert {
  title: string;
  sub_title: string;
  body: string;
  close_text: string;
  ok_text: string;
  type?: AlertTypes;
}

export enum AlertTypes {
    Success,
    Error,
    Info
}
