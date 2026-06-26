import type { Order } from "../types";
import { products } from "./products";

const p = (id: string) => products.find((pr) => pr.id === id)!;

export const orders: Order[] = [
  {
    id: "HW-2024-00801",
    date: "2024-11-28",
    status: "Delivered",
    items: [
      { product: p("p-001"), quantity: 120 },
      { product: p("p-006"), quantity: 80 },
      { product: p("p-048"), quantity: 6 },
    ],
    address: {
      flatNo: "Flat 402",
      building: "Prestige Lakeside Habitat",
      locality: "Varthur Road, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
    },
    paymentMethod: "UPI — GooglePay",
    subtotal: 37240,
    gst: 4469,
    delivery: 0,
    total: 41709,
    trackingEvents: [
      { date: "2024-11-28 10:05", status: "Order Placed", description: "Order confirmed and payment received" },
      { date: "2024-11-28 15:30", status: "Confirmed", description: "Seller confirmed order at Bengaluru warehouse" },
      { date: "2024-11-29 09:00", status: "Dispatched", description: "Shipped from Bengaluru Hub via BlueDart" },
      { date: "2024-11-30 11:45", status: "Out for Delivery", description: "Out for delivery — expected by 7pm" },
      { date: "2024-11-30 16:20", status: "Delivered", description: "Delivered and accepted by Flat 402 resident" },
    ],
  },
  {
    id: "HW-2024-00834",
    date: "2024-12-15",
    status: "Dispatched",
    items: [
      { product: p("p-017"), quantity: 20 },
      { product: p("p-021"), quantity: 150 },
      { product: p("p-024"), quantity: 5 },
    ],
    address: {
      flatNo: "Plot 18",
      building: "Prestige Silver Oak",
      locality: "Sarjapur Main Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102",
    },
    paymentMethod: "No Cost EMI — 6 months (HDFC)",
    subtotal: 21550,
    gst: 2586,
    delivery: 0,
    total: 24136,
    trackingEvents: [
      { date: "2024-12-15 09:15", status: "Order Placed", description: "Order confirmed" },
      { date: "2024-12-15 14:00", status: "Confirmed", description: "Seller confirmed at Delhi warehouse" },
      { date: "2024-12-16 08:30", status: "Dispatched", description: "Shipped via Delhivery — Bengaluru bound" },
    ],
  },
  {
    id: "HW-2024-00847",
    date: "2024-12-22",
    status: "Processing",
    items: [
      { product: p("p-009"), quantity: 2 },
      { product: p("p-011"), quantity: 2 },
      { product: p("p-043"), quantity: 2 },
    ],
    address: {
      flatNo: "Villa 7",
      building: "Adarsh Palm Retreat",
      locality: "Devanahalli",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "562110",
    },
    paymentMethod: "Credit Card — ICICI Visa",
    subtotal: 62600,
    gst: 7512,
    delivery: 0,
    total: 70112,
    trackingEvents: [
      { date: "2024-12-22 19:44", status: "Order Placed", description: "Order placed and payment verified" },
    ],
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
