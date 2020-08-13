declare namespace Express {
  export interface Response {
    respond: (data: any) => void;
  }

  export interface Request {
    // TODO: Rename it to currentUser
    user?: import("../database/entity").User;
  }
}
