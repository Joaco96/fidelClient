import { Reward } from "./Reward";

export class Redemption {
  declare id: string;
  declare user_id: string;
  declare reward_id: string;
  declare is_delivered: string;
  declare qr_code: string;
  declare quantity: number;
  declare reward: Reward;
  declare createdAt: Date;
  declare updatedAt: Date;
}