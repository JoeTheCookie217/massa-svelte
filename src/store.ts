import type { IAccount } from "@massalabs/wallet-provider";
import { writable } from "svelte/store";

export const accountStore = writable<IAccount | null>(null);
