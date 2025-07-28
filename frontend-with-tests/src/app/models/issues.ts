import { DateTypes } from "../types/record";

interface IssuesItem{
  url: string;
  repository_url: string;
  user: any;
  created_at: DateTypes;
  updated_at: DateTypes;
  closed_at: DateTypes | null;
  score: number;
  title: string;
  body: string;
}

export type { IssuesItem }
