import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ConfigState } from "./configSliceType";

const initialState: ConfigState = {
  trivia_categories: [
    {
      id: 9,
      name: 'General Knowledge'
    },
    {
      id: 10,
      name: 'Entertainment: Books'
    }
  ],
  isLoading: false,
  error: null
};

export const getCategoryThunk = createAsyncThunk(
  'configMenu/fetchCategories',
  async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    return await response.json();
  }
);

const configSlice = createSlice({
  name: 'configMenu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trivia_categories = action.payload.trivia_categories;
      })
      .addCase(getCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  }
});

export default configSlice.reducer;