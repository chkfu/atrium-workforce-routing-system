//  leanrt:  d.ts file use for specify the types / interface for ts compiler
import { TUserBase, TSchemaBase } from "./schema_types";
import { Express, Request } from "express";


//  remarks: in this case, declare globally to extended Request interface for user details storage
declare global {
  namespace Express {
    interface Request {
      user?: TUserBase & TSchemaBase;
    }
  }
}