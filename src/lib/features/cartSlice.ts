import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, TileProduct } from "@/types";
import {
  CART_TILE_QUANTITY,
  catalogEntryToTileProduct,
  getVisualizationCatalogEntry,
} from "@/lib/visualizationTileCatalog";

const SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 25;

export const TILE_QUANTITY_STEP = CART_TILE_QUANTITY;
export const MAX_TILE_BATCHES = 99;
export const MAX_TILE_QUANTITY = CART_TILE_QUANTITY * MAX_TILE_BATCHES;

const initialProducts: TileProduct[] = [
  {
    id: "ocean-wave",
    name: "Ocean Wave",
    price: 28.0,
    quantityStep: CART_TILE_QUANTITY,
    colorHex: "#2B4F8F",
    patternLabel: "Wave",
  },
  {
    id: "forest-fern",
    name: "Forest Fern",
    price: 30.0,
    quantityStep: CART_TILE_QUANTITY,
    colorHex: "#4A8030",
    patternLabel: "Fern",
  },
  {
    id: "terracotta-dot",
    name: "Terracotta Dot",
    price: 26.0,
    quantityStep: CART_TILE_QUANTITY,
    colorHex: "#C47A62",
    patternLabel: "Dot",
  },
  {
    id: "yellow-star",
    name: "Yellow Star",
    price: 29.0,
    quantityStep: CART_TILE_QUANTITY,
    colorHex: "#E8C44A",
    patternLabel: "Star",
  },
];

function resolveTileProduct(
  tileId: string,
  availableProducts: TileProduct[]
): { product: TileProduct; initialQuantity: number } | undefined {
  const catalogEntry = getVisualizationCatalogEntry(tileId);
  if (catalogEntry) {
    return {
      product: catalogEntryToTileProduct(catalogEntry),
      initialQuantity: catalogEntry.initialQuantity,
    };
  }

  const legacyProduct = availableProducts.find(
    (product) => product.id === tileId
  );
  if (!legacyProduct) {
    return undefined;
  }

  return {
    product: legacyProduct,
    initialQuantity: CART_TILE_QUANTITY,
  };
}

interface CartState {
  items: CartItem[];
  availableProducts: TileProduct[];
}

const initialState: CartState = {
  items: [
    { product: initialProducts[0], quantity: 150, quantityDelta: CART_TILE_QUANTITY },
    { product: initialProducts[1], quantity: 75, quantityDelta: CART_TILE_QUANTITY },
    { product: initialProducts[2], quantity: 200, quantityDelta: CART_TILE_QUANTITY },
    { product: initialProducts[3], quantity: 50, quantityDelta: CART_TILE_QUANTITY },
  ],
  availableProducts: initialProducts,
};

function resolveAddQuantity(
  tileId: string,
  availableProducts: TileProduct[]
): number {
  if (getVisualizationCatalogEntry(tileId)) {
    return CART_TILE_QUANTITY;
  }

  const legacyProduct = availableProducts.find(
    (product) => product.id === tileId
  );
  if (legacyProduct) {
    return CART_TILE_QUANTITY;
  }

  return TILE_QUANTITY_STEP;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) {
        item.quantity = Math.min(
          item.quantity + item.quantityDelta,
          MAX_TILE_QUANTITY
        );
      }
    },
    decrementQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (!item) return;

      if (item.quantity <= item.quantityDelta) {
        state.items = state.items.filter((i) => i.product.id !== action.payload);
        return;
      }

      item.quantity -= item.quantityDelta;
    },
    setQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (!item) return;

      const clampedQuantity = Math.min(
        Math.max(item.quantityDelta, action.payload.quantity),
        MAX_TILE_QUANTITY
      );
      item.quantity = clampedQuantity;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    addItem(state, action: PayloadAction<string>) {
      const resolved = resolveTileProduct(
        action.payload,
        state.availableProducts
      );
      if (!resolved) return;

      const { product, initialQuantity } = resolved;
      const addQuantity = resolveAddQuantity(
        product.id,
        state.availableProducts
      );
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + addQuantity,
          MAX_TILE_QUANTITY
        );
      } else {
        state.items.push({
          product,
          quantity: initialQuantity,
          quantityDelta: CART_TILE_QUANTITY,
        });
      }
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  removeItem,
  addItem,
} = cartSlice.actions;

export function selectBatchCount(quantity: number): number {
  return quantity / TILE_QUANTITY_STEP;
}

export function selectLineTotal(item: CartItem): number {
  const batchCount = item.quantity / item.product.quantityStep;
  return batchCount * item.product.price;
}

export function selectSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + selectLineTotal(item), 0);
}

export function selectShipping(subtotal: number): number {
  return subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function selectGrandTotal(subtotal: number, shipping: number): number {
  return subtotal + shipping;
}

export function selectCartLineCount(items: CartItem[]): number {
  return items.length;
}

export default cartSlice.reducer;
