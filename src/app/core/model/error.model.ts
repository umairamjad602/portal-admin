  export interface ErrorModelRootObject {
    statusCode: number;
    error: string;
    message: string;
    attributes?: any;
  }

  export interface ErrorModelErrorMessageObject {
    id: number;
    error: string;
    type: string;
    log_id?: string;
    serviceUrl: any;
  }
