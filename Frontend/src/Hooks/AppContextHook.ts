import { useContext } from "react";
type ToastMessage = {
    message: string,
    type: "SUCCESS" | "ERROR"
}
import { createContext } from "react";
type AppContext = {
    showToast: (toastMessage: ToastMessage) => void,
    isLoggedIn: boolean
}

export const AppContext = createContext<AppContext | undefined>(undefined); //create a context of type AppContext


export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext
}