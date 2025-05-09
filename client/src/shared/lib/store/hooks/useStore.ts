import { RootStoreContext } from "@/app/_lib/store/store"
import { useContext } from "react"

export const useStore = () => {
    const context = useContext(RootStoreContext)

    if (!context) {
        throw new Error("useStore must be used within RootStoreProvider")
    }

    return context
    
}