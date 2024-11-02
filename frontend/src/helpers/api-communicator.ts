import axios from "axios"

export const loginUser=async(email:string,password:string)=>{
    const res=await axios.post("/users/login",{email,password});
    if(!res){
        throw new Error("Unable to login");
    }
    const data=await res.data;
    return data;
}

export const signupUser=async(name:string,email:string,password:string)=>{
    const res=await axios.post("/users/signup",{name,email,password});
    if(!res){
        throw new Error("Unable to signup");
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
export const sendChatRequest=async(message:string)=>{
    const res=await axios.post("/chats/new",{message});
    if(res.status != 200){
        throw new Error("Unable to authenticate");
    }
    const data=await res.data;
    return data;
}
export const getAllChat=async()=>{
    const res=await axios.get("/chats/all-chats");
    if(res.status != 200){
        throw new Error("Unable to authenticate");
    }
    const data=await res.data;
    return data;
}

export const deleteAllChat=async()=>{
    const res=await axios.delete("/chats/delete");
    if(res.status != 200){
        throw new Error("Unable to delete");
    }
    const data=await res.data;
    return data;
}


export const userLogout=async()=>{
    const res=await axios.get("/users/logout");
    if(res.status != 200){
        throw new Error("Unable to delete");
    }
    const data=await res.data;
    return data;
}