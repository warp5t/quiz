import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizApiParamsRequest, QuizState } from './configStartSliceType';

const initialState: QuizState = {
  isLoading: false,
  error: null,
  response_code: 0,
  time: 0,
  results: [
    {
      type: 'multiple',
      difficulty: 'easy',
      category: 'Art',
      question: 'What is the world&#039;s oldest known piece of fiction?',
      correct_answer: 'Epic of Gilgamesh',
      incorrect_answers: ['Papyrus of Ani', 'Code of Hammurabi', 'Rosetta Stone'],
    },
  ],
};

export const getStartQuest = createAsyncThunk<
  QuizState,
  QuizApiParamsRequest,
  { rejectValue: string }
>('initStartQuest', async (params, { rejectWithValue }) => {
  const { amount: ammount = 10, category, difficulty, type } = params;

  const url = new URL('https://opentdb.com/api.php');
  url.searchParams.append('amount', ammount.toString());
  if (category) url.searchParams.append('category', category.toString());
  if (difficulty) url.searchParams.append('difficulty', difficulty);
  if (type) url.searchParams.append('type', type);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: QuizState = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Unknown error occurred');
  }
});

const configSliceInit = createSlice({
  name: 'configStart',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStartQuest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStartQuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.response_code = action.payload.response_code;
        state.results = action.payload.results;
      })
      .addCase(getStartQuest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch selected quiz';
      });
  },
});

export const { setTime } = configSliceInit.actions;
export default configSliceInit.reducer;
