import { createContext,ReactNode} from "react";

type AuthContextProps={
    children:ReactNode;
}
type User={
    name:string;
}

export const AuthContext=createContext<User|null>(null);
export const AuthProvider=({children}:AuthContextProps)=>{

    const user={
        name:"sam"
    }
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
