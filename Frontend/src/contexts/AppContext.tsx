import React, { useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../api-client";
import { AppContext } from '../Hooks/AppContextHook'

type ToastMessage = {
    message: string,
    type: "SUCCESS" | "ERROR"
}


export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const { isError } = useQuery({
        queryFn: validateToken, //this will call the validateToken function from the api-client.ts file
        queryKey: ['loginkey'],
        retry: false,

    })



    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    return (
        <AppContext.Provider

            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage) //this will set the toast message and occurs a re-render
                },
                isLoggedIn: !isError
            }}

        >
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => {
                setToast(undefined) //this will close the toast and occurs a re-render
            }} />)}
            {children}

        </AppContext.Provider>
    )

}

