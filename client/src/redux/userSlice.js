import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  updateLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    updateStart: (state) => {
      state.updateLoading = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      state.updateLoading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    updateFailure: (state) => {
      state.updateLoading = false;
      state.error = true;
    },
    followUser: (state, action) => {
      state.currentUser?.followings?.push(action.payload);
    },

    unFollowUser: (state, action) => {
      state.currentUser.followings.splice(
        state.currentUser.followings.findIndex((id) => id === action.payload),
        1
      );
    },

    updateBookmarks: (state, action) => {
      if (!state.currentUser.bookmarks.includes(action.payload)) {
        state.currentUser.bookmarks.push(action.payload);
      } else {
        state.currentUser?.bookmarks?.splice(
          state.currentUser?.bookmarks.findIndex((id) => id === action.payload),
          1
        );
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateStart,
  updateSuccess,
  updateFailure,
  followUser,
  unFollowUser,
  updateBookmarks,
} = userSlice.actions;

export default userSlice.reducer;
