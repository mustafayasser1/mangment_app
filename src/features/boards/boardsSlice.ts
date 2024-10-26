import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../types";

interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
  status: "idle",
  error: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    setCurrentBoard: (state, action: PayloadAction<Board>) => {
      state.currentBoard = action.payload;
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.boards.findIndex(
        (board) => board.id === action.payload.id
      );
      if (index !== -1) {
        state.boards[index] = action.payload;
      }
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
  },
});

export const {
  setBoards,
  setCurrentBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
