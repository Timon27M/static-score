'use client';

import userStore from "@/entities/user/lib/store/userStore";
import { createContext } from "react";

export class RootStore {
    user = userStore;
}

export const RootStoreContext = createContext<RootStore | null>(null);


