import { Router} from "express";
import { getUsers } from "../controllers/user-controller.js";

const userRoutes=Router();

// userRouter.use("/users",)

console.log("user route");

// userRoutes.get('/',(req,res)=>{
//     console.log("user chat");
//     res.json("Hello user ");
// })

userRoutes.get('/',getUsers)
export default userRoutes;