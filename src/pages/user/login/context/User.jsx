import { createContext ,useState } from "react"
export const UserContext = createContext();

const UserContextProvider = ({children})=>{
    const [userName,setUserName] = useState("userName");

    
    return <UserContext.Provider value={userName}>
        {children}
    </UserContext.Provider>;


}

export default UserContextProvider;