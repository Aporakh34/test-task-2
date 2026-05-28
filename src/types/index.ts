export interface TileProduct {
  id: string;
  name: string;
  price: number;
  /** Pricing batch size (sq. ft. per unit price). */
  quantityStep: number;
  colorHex: string;
  patternLabel: string;
  imageUrl?: string;
}

export interface CartItem {
  product: TileProduct;
  quantity: number;
  /** Sq. ft. per Add / Remove in cart (matches catalog initialQuantity when added). */
  quantityDelta: number;
}

export type PaymentMethod = "credit_card" | "paypal" | "apple_pay" | "bank_transfer";

export interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface FieldErrors {
  [key: string]: string;
}

export type GridCell = string | null;

export interface DesignGrid {
  cells: GridCell[][];
  selectedPaletteId: string | null;
}
