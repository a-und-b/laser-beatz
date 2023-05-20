import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const stringifiedUser = localStorage.getItem('laserbeatz-user');
    
        if (stringifiedUser) {
          const parsedUser = JSON.parse(stringifiedUser);
          setUser(parsedUser);
        }
      }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider