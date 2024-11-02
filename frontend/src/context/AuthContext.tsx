import { createContext, ReactNode, useState,useContext ,useEffect} from "react";
import { checkStatus, loginUser, signupUser, userLogout } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
  };
  type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };
const AuthContext=createContext<UserAuth | null>(null);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        // fetch if the user's cookies are valid then skip login
        async function checkAuthStatus() {
           const data=await checkStatus();
           if(data){
            setUser({email:data.email,name:data.name});
            setIsLoggedIn(true);
          }
        }
        checkAuthStatus();

      }, []);

      const signup=async (name:string,email:string,password:string)=>{
        const data=await signupUser(name,email,password);
        if(data){
          setUser({email:data.email,name:data.name});
          setIsLoggedIn(true);
        }
      }
      const login=async (email:string,password:string)=>{
        const data=await loginUser(email,password);
        if(data){
          setUser({email:data.email,name:data.name});
          setIsLoggedIn(true);
        }

      }
      const logout=async()=>{
        const data=await userLogout();
        if(data){
          setUser(null);
          setIsLoggedIn(false);
        }
        window.location.reload(); 
      }

      const value={
        isLoggedIn,
        user,
        login,
        signup,
        logout,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);