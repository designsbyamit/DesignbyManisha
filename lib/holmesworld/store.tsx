"use client";

import React, { createContext, useContext, useReducer } from "react";
import type { CartItem, BomResult } from "./types";

interface StoreState {
  cartItems: CartItem[];
  bomResults: BomResult[];
  recentlyViewed: string[];
}

type Action =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_BOM_RESULTS"; payload: BomResult[] }
  | { type: "ADD_TO_RECENTLY_VIEWED"; payload: { productId: string } };

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cartItems.find(
        (i) => i.productId === action.payload.productId
      );
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.productId !== action.payload.productId
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "SET_BOM_RESULTS":
      return { ...state, bomResults: action.payload };
    case "ADD_TO_RECENTLY_VIEWED": {
      const filtered = state.recentlyViewed.filter(
        (id) => id !== action.payload.productId
      );
      return {
        ...state,
        recentlyViewed: [action.payload.productId, ...filtered].slice(0, 4),
      };
    }
    default:
      return state;
  }
}

const initialState: StoreState = {
  cartItems: [],
  bomResults: [],
  recentlyViewed: [],
};

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function HolmesWorldProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within HolmesWorldProvider");
  return ctx;
}

export function useCartCount() {
  const { state } = useStore();
  return state.cartItems.reduce((sum, i) => sum + i.quantity, 0);
}
