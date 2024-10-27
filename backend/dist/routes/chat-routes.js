import { Router } from "express";
const chatRoutes = Router();
// userRouter.use("/users",)
chatRoutes.get('/', (req, res) => {
    console.log("user chat");
    res.json("Hello user chat ");
});
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map