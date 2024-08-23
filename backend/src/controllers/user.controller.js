import UserDao from "../models/user.dao.js";
import { comparePassword, createToken } from "../utils/auth.js";

class UserController {
  static signup = async (req, res) => {
    const { firstName, lastName, email, password, nationalId } = req.body;

    try {
      const userData = { firstName, lastName, email, password, nationalId, role: 'USER' };
      const newUser = await UserDao.createUser(userData);

      const token = createToken(newUser.id, newUser.role);

      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json({ token, ...userWithoutPassword });
    } catch (err) {
      console.error(err);
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserDao.getUserByEmail(email);
      console.log(user)
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = createToken(user.id, user.role);
      const { password: userPassword, ...otherAttributes } = user;

      return res.status(200).json({ token, ...otherAttributes });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default UserController;