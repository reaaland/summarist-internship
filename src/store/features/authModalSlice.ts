import { createSlice } from "@reduxjs/toolkit";

interface AuthModalState {
  isOpen: boolean;
  mode: "login" | "register";
}

const initialState: AuthModalState = {
  isOpen: false,
  mode: "login",
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isOpen = true;
      state.mode = "login";
    },

    openRegisterModal: (state) => {
      state.isOpen = true;
      state.mode = "register";
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  openLoginModal,
  openRegisterModal,
  closeModal,
} = authModalSlice.actions;

export default authModalSlice.reducer;