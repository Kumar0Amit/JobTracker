import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });
};

export const attachCookiesToResponse = (res, user) => {
  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // only https in prod
    signed: false,
    expires: new Date(Date.now() + oneDay),
    sameSite: "strict",
  });
};


// ✅ verify JWT from cookie
export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // invalid/expired token
  }
};