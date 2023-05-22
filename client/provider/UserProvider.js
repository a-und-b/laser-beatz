import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

const UserProvider = ({ children }) => {
    

    

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider