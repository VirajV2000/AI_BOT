import app from './app.js';
import { connectToDatabase } from "./db/connection.js";
connectToDatabase().then(() => {
    app.listen(3000, () => console.log("Server started and connected to db"));
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map