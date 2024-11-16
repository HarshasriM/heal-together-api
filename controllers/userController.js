
import userService from "../services/userService.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_WEB_TOKEN = process.env.JWT_WEB_TOKEN;
console.log(JWT_WEB_TOKEN);

class UserController {
    async signUp(req, res) {
        try {
            const { email, password, firstName, lastName, phone, country, city,username } = req.body;

            if (!email || !password || !firstName || !lastName || !phone || !country || !city || !username) {
                return res.status(400).json({ message: 'All fields  are required' });
            }

            const user = await userService.signUp({
                username:req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                country: req.body.country,
                city: req.body.city,
            });
            return res.status(201).json({
                success: true,
                data: user,
                message: "Successfully created a new user",
                err: {},
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                data: {},
                message: error.message,
                err: error.name,
            });
        }
    }

}
export default new UserController();
