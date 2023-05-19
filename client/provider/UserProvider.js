import { createContext, useState } from 'react'

export const UserContext = createContext({ user: {} })

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    console.log('USER DATA : ', user)
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider