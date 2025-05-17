import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const contextValue = {isLoggedIn, setIsLoggedIn}

    return (
            <UserContext.Provider value={contextValue}>
                {children}
            </UserContext.Provider>
        )
};