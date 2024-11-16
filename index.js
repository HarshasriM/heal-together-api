import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import { PORT } from './config/serverConfig.js';
import userRoute from "./routes/userRoutes.js"
const app = express();



// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/api/user",userRoute);

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`App listening at port ${PORT}`);
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
});
