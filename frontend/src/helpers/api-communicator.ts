import axios from "axios"

export const loginUser=async(email:string,password:string)=>{
    const res=await axios.post("/users/login",{email,password});
    if(!res){
        throw new Error("Unable to login");
    }
    const data=await res.data;
    return data;
}

export const checkStatus=async()=>{
    const res=await axios.get("/users/auth-status");
    if(res.status != 200){
        throw new Error("Unable to authenticate");
    }
    const data=await res.data;
    return data;
}