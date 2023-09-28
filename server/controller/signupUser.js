import bcrypt from "bcrypt";

import User from "../model/userSchema.js";

export const signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      name: request.body.name,
      username: request.body.username,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ mes: "signup successfull" });
  } catch (error) {
    return response
      .status(500)
      .json({ mes: "error while signup the user", error });
  }
};
