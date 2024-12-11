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
    async signIn(userData) {
        try {
          const user = await userRepository.findUserByEmail(userData.email);
          if (!user) {
            throw { message: "No user found" };
          }
          if (!user.comparePassword(userData.password)) {
            throw { message: "Wrong password" };
          }
          const token = user.genJWT();
          return {token,user};
        } catch (error) {
          throw error;
        }
      }
}

export default new UserService();
