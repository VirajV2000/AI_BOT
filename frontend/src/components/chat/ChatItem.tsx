import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";


function extractCodeFromString(message:string){
    if(message.includes("```")){
      const blocks=message.split("```");
      return blocks;
    }
}
function isCodeBlock(str:string){
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }else{
    return false;
  }
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "model";
}) => {
  const messageBlocks = extractCodeFromString(content);

  const auth = useAuth();
  return role == "model" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
          {!messageBlocks && <Typography sx={{ fontSize: "20px" }}>{content}</Typography>}
          {/* <Typography sx={{ fontSize: "20px" }}>{content}</Typography> */}
          {messageBlocks && messageBlocks.length !=0 && messageBlocks.map((block)=>
              isCodeBlock(block)? <SyntaxHighlighter style={coldarkDark} language="javascript">{block}</SyntaxHighlighter>:
             ( <Typography sx={{ fontSize: "20px" }}>{block}</Typography>)
          )}
        
      
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {/* {auth?.user?.name.split(" ")[1][0]} */}
      </Avatar>
      <Box>
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
       
      </Box>
    </Box>
  );
};

export default ChatItem