import { Store } from "./Store";

export class Ticket {
  declare id: string;
  declare user_id: string;
  declare store_id: string;
  declare amount_spent: number;
  declare points_earned: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare store: Store;
}
