import { Router} from "express";
import { getUsers, UserLogin, UserSignUp } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validator.js";

const userRoutes=Router();

// userRouter.use("/users",)

console.log("user route");

// userRoutes.get('/',(req,res)=>{
//     console.log("user chat");
//     res.json("Hello user ");
// })

userRoutes.get('/',getUsers)
userRoutes.post('/signup',validate(signupValidator),UserSignUp);
userRoutes.post('/login',validate(loginValidator),UserLogin);

export default userRoutes;