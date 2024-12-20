import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useAuth } from '../context/AuthContext'
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { deleteAllChat, getAllChat, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


// Example of accessing the array
// console.log(participants);
type Message={
  role:"user" | "model";
  content:string;
}
const Chat = () => {
  const navigate=useNavigate();
  const inputRef=useRef<HTMLInputElement | null>(null);
  const auth=useAuth();
  const [chatMessages,setchatMessages]=useState<Message[]>([]);
  const handleSubmit=async()=>{
      const content=inputRef.current?.value as string;
      if(inputRef && inputRef.current){
        inputRef.current.value=" ";
      }      
      const newmessage:Message={role:"user", content };
      setchatMessages((prev)=>[...prev,newmessage]);

      const chatData= await sendChatRequest(content);
      setchatMessages([...chatData.chats]);
  }

  const handleDeleteChats=async()=>{
      try {
        toast.loading("deleteing all chats",{id:"deletechats"});
        await deleteAllChat();
        setchatMessages([]);
        toast.success("successfully deleted",{id:"deletechats"});
      } catch (error) {
        console.log(error);
        
      }
  }
  useLayoutEffect(()=>{
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading chats",{id:"loadchats"});
      getAllChat().then((data)=>{
        setchatMessages([...data.chats]);
        toast.success("Loaded successfully",{id:"loadchats"});
      })
      .catch((error)=>{
        console.log(error);
        toast.error("Loading Failed", { id: "loadchats" });
      });
    }
  },[auth]);
  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login");
    }
  },[auth])
  return (
    <Box
    sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3,
    }}
  >
    <Box
      sx={{
        display: { md: "flex", xs: "none", sm: "none" },
        flex: 0.2,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3,
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontWeight: 700,
          }}
        >
          {auth?.user?.name[0]}
          {/* {auth?.user?.name.split(" ")[1][0]} */}
        </Avatar>
        <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
          You are talking to a ChatBOT
        </Typography>
        <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
          You can ask some questions related to Knowledge, Business, Advices,
          Education, etc. But avoid sharing personal information
        </Typography>
        <Button
          onClick={handleDeleteChats}
          sx={{
            width: "200px",
            my: "auto",
            color: "white",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: red[300],
            ":hover": {
              bgcolor: red.A400,
            },
          }}
        >
          Clear Conversation
        </Button>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flex: { md: 0.8, xs: 1, sm: 1 },
        flexDirection: "column",
        px: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: "40px",
          color: "white",
          mb: 2,
          mx: "auto",
          fontWeight: "600",
        }}
      >
        Model - GPT 3.5 Turbo
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "60vh",
          borderRadius: 3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {chatMessages.map((chat, index) => (
          //@ts-ignore
          <ChatItem content={chat.content} role={chat.role} key={index} />
        ))}
      </Box>
      <div
        style={{
          width: "100%",
          borderRadius: 8,
          backgroundColor: "rgb(17,27,39)",
          display: "flex",
          margin: "auto",
        }}
      >
        {" "}
        <input
          ref={inputRef}
          type="text"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            padding: "30px",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "20px",
          }}
        />
        <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
          <IoMdSend />
        </IconButton>
      </div>
    </Box>
  </Box>  )
}

export default Chat