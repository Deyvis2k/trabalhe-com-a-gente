

interface SearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
  total_issues?: number;
}

export type { SearchResponse };
