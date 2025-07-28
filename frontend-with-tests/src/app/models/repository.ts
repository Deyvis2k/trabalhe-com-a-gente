import { DateTypes, NameAndRepo } from '../types/record';

interface RepositoryItem {
  full_name: string;
  description: string;
  language: string;
  url: string;
  created_at: DateTypes;
  updated_at: DateTypes;
  avatar_url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
  name_and_repo: NameAndRepo;
}



export type { RepositoryItem };
