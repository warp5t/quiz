export interface Category {
  id: number;
  name: string;
}

export interface ConfigState {
  trivia_categories: Category[];
  isLoading: boolean;
  error: string | null;
}