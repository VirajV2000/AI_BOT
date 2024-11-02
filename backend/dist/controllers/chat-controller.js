import User from "../models/User.js";
import { configureAI } from "../config/openai-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        // Find user by ID to get chat history
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        // Prepare chat history and add the new message
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // Configure AI and set up model with Gemini
        const genAI = configureAI();
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Start a chat session with the model
        const chat = model.startChat({ history: chats.map(chat => ({ role: chat.role, parts: [{ text: chat.content }] })) });
        // Send the user message and get the bot response
        const result = await chat.sendMessage(message);
        // Extract the response from the model and update user's chat history
        const botMessage = result.response.text(); // Adjusted to extract the response correctly
        user.chats.push({ content: botMessage, role: "model" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Something went wrong", cause: error.message });
    }
};
export const getAllChat = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.status(200).json({ mesage: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error.toString());
        res.json({ mesage: "Error", cause: error.message });
    }
};
export const deleteAllChat = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        // @ts-ignore
        user.chats = [];
        await user.save();
        res.status(200).json({ mesage: "OK" });
    }
    catch (error) {
        console.log(error.toString());
        res.json({ mesage: "Error", cause: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map