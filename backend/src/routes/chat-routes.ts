import { Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
import { messageValidator, validate } from "../utils/validator.js";
import { deleteAllChat, generateChatCompletion, getAllChat } from "../controllers/chat-controller.js";

const chatRoutes=Router();

// userRouter.use("/users",)

chatRoutes.get('/',(req,res)=>{
    console.log("user chat");
    res.json("Hello user chat ")
})
chatRoutes.post('/new',validate(messageValidator),verifyToken,generateChatCompletion);
chatRoutes.get('/all-chats',verifyToken,getAllChat);
chatRoutes.delete('/delete',verifyToken,deleteAllChat);


export default chatRoutes;