export interface JwtPayload {
  userId: string;
  role: number;
  name: string;
  email: string;
  dni: string,
  createdAt: Date;
}

export interface JwtRedemptionPayload {
  id: string;
}