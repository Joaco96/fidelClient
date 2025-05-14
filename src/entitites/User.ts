import { RoleIds } from "./Role";

export class User {
  declare id: string;
  declare role_id: RoleIds;
  declare name: string;
  declare dni: string;
  declare email: string;
  declare password?: string;
  declare points_balance: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}