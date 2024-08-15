'use client'
import store from "@/stores";
import { useEffect } from "react";
import { Provider } from "react-redux";

function StoreProvider({children}:any) {
    useEffect(() => {
        if(localStorage?.getItem('theme')){
            document.body.classList.add(localStorage.getItem('theme') === 'dark' ? 'darkTheme' : 'lightTheme');
        }
    })
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default StoreProvider;