import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return res.status(401).json("You are not authorized to access this");
    }

    jwt.verify(token, process.env.PRIVATE_KEY as string, (err, user) => {
      if (err) return res.status(403).json("Your token is invalid");
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json("Something went wrong: " + err.message);
  }
};
