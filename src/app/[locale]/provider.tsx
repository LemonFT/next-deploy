'use client'
import store from "@/stores";
import { useEffect } from "react";
import { Provider } from "react-redux";

function StoreProvider({children}:any) {
    useEffect(() => {
        if(localStorage?.getItem('theme')){
            const theme = localStorage.getItem('theme') === 'dark' ? 'darkTheme' : 'lightTheme'
            document.body.classList.add(theme);
            localStorage.setItem('theme', theme)
        }
    })
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default StoreProvider;