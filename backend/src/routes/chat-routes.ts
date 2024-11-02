import { Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
import { messageValidator, validate } from "../utils/validator.js";
import { generateChatCompletion } from "../controllers/chat-controller.js";

const chatRoutes=Router();

// userRouter.use("/users",)

chatRoutes.get('/',(req,res)=>{
    console.log("user chat");
    res.json("Hello user chat ")
})
chatRoutes.post('/new',validate(messageValidator),verifyToken,generateChatCompletion)
export default chatRoutes;