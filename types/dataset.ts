import { CompanyMeta } from "./company";
import { AppUser } from "./user";

export enum DatasetVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface Dataset {
  _id: string;
  owner: AppUser;
  name: string;
  visibility: DatasetVisibility;
}

export interface DatasetPopulated extends Dataset {
  companies: Array<CompanyMeta>;
}
