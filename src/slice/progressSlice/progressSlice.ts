import { createSlice } from '@reduxjs/toolkit';

const questParams = {
  categoryName: '',
  type: '',
  question: '',
  category: '',
  difficulty: '',
  answer_player: '',
  correct_answer: '',
};

const initialState = {
  gameType: {
    victory: 0,
    lose: 0,
    question_stat: [questParams],
  },
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    sendAnswer: (state, action) => {
      state.gameType.question_stat.push(action.payload);
    },
  },
});

export const { sendAnswer } = progressSlice.actions;
export default progressSlice.reducer;
