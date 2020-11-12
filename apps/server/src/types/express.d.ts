declare namespace Express {
  export interface Response {
    respond: (data: any) => void;
  }

  export interface Request {
    currentUser?: import("../infrastucture/database/entity").User;
  }
}
