export interface Unit {
  id: string;
  name: String,
  description: string,
  orderUnit: string,
  levelId: string,
  status: "lock" | "available" | "done" | "reading";
}
