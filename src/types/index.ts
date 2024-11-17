export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: "user" | "admin";
}

export interface IAssignment {
  _id: string;
  userId: string;
  task: string;
  admin: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}
