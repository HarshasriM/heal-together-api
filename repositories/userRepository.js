
import User from "../models/userModel.js";

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export default new UserRepository();
