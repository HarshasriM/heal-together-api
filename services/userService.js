import userRepository from "../repositories/userRepository.js";

class UserService {

    async signUp(userData) {

        // Check if the user already exists
        const existingUser = await userRepository.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Create a new user
        const newUser = await userRepository.createUser(userData);

        // Generate JWT token
        const token = newUser.genJWT();
        return { user: userData , token };
    }
}

export default new UserService();
