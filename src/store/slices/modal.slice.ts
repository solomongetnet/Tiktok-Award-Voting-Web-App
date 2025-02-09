import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  [key: string]: boolean;
};

type ModalStateValuesEnum =
  | "loginModal"
  | "voteModal"
  | "settingsModal"
  | "helpModal";

const initialState: ModalState = {
  loginModal: false,
  voteModal: false,
  settingsModal: false,
  helpModal: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<ModalStateValuesEnum>) => {
      const modalId = action.payload;
      state[modalId] = !state[modalId];
    },
    showModal: (state, action: PayloadAction<ModalStateValuesEnum>) => {
      const modalId = action.payload;
      state[modalId] = true;
    },
    hideModal: (
      state,
      action: PayloadAction<{ modalId: ModalStateValuesEnum }>
    ) => {
      const modalId = action.payload.modalId;
      state[modalId] = false;
    },
  },
});

export const { toggleModal, showModal, hideModal } = modalSlice.actions;

export const selectModalVisibility = (
  state: { modals: ModalState },
  modalId: string
): boolean => state.modals[modalId] || false;

export default modalSlice.reducer;
