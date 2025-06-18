interface Question {
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizApiParamsRequest {
  amount?: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

export interface QuizState {
  response_code: number;
  results: Question[];
  isLoading: boolean;
  error: string | null;
  time: number;
}
