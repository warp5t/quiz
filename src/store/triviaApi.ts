// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// type Category = {
//   id: number;
//   name: string;
// };
// type CategoryResponse = {
//   trivia_categories: Category[];
// };

// type GlobalQuestionCount = {
//   total_num_of_questions: number;
//   total_num_of_pending_questions: number;
//   total_num_of_verified_questions: number;
//   total_num_of_rejected_questions: number;
// };

// type QueryParams = {
//   amount: number;
//   category: number;
//   difficulty: 'easy' | 'medium' | 'hard';
//   type: 'multiple' | 'boolean';
// };

// type Question = {
//   question: string;
//   correct_answer: string;
//   incorrect_answers: string[];
//   // и другие поля
// };

// export const triviaApi = createApi({
//   reducerPath: 'triviaApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://opentdb.com/' }),
//   endpoints: (builder) => ({
//     getCategories: builder.query<Category[], void>({
//       query: () => 'api_category.php',
//       transformResponse: (response: CategoryResponse) => response.trivia_categories,
//     }),

//     getGlobalCount: builder.query<GlobalQuestionCount, void>({
//       query: () => 'api_count_global.php',
//       transformResponse: (response: { overall: GlobalQuestionCount }) => response.overall,
//     }),
//     getQuestions: builder.query<Question[], QueryParams>({
//       query: ({ amount, category, difficulty, type }) => {
//         const params = new URLSearchParams({
//           amount: String(amount),
//           category: String(category),
//           difficulty,
//           type,
//         });
//         return `api.php?${params.toString()}`;
//       },
//       transformResponse: (response: { results: Question[] }) => response.results,
//     }),
//   }),
// });

// export const { useGetCategoriesQuery, useGetGlobalCountQuery, useGetQuestionsQuery } = triviaApi;
