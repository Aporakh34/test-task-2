import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DesignGrid } from "@/types";
import { DESIGN_GRID_ROWS, DESIGN_GRID_COLS } from "@/lib/gridConfig";
import { createInitialGridCells } from "@/lib/gridInitialLayout";

function createEmptyGrid(): (string | null)[][] {
  return Array.from({ length: DESIGN_GRID_ROWS }, () =>
    Array.from({ length: DESIGN_GRID_COLS }, () => null)
  );
}

const initialState: DesignGrid = {
  cells: createInitialGridCells(),
  selectedPaletteId: null,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    selectPaletteTile(state, action: PayloadAction<string | null>) {
      state.selectedPaletteId = action.payload;
    },
    placeTile(
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) {
      const { row, col } = action.payload;
      if (state.selectedPaletteId !== null) {
        state.cells[row][col] = state.selectedPaletteId;
      }
    },
    eraseTile(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      state.cells[row][col] = null;
    },
    clearGrid(state) {
      state.cells = createEmptyGrid();
    },
  },
});

export const { selectPaletteTile, placeTile, eraseTile, clearGrid } =
  gridSlice.actions;

export default gridSlice.reducer;
