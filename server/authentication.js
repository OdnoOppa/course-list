
import { expressjwt } from "express-jwt";
import { getUserByEmail } from "./controllers/user.js";
import jwt from "jsonwebtoken";

const secret = "IiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2dobkBnbW";

export const authenticationMiddleware = expressjwt({
  algorithms: ["HS256"],
  secret,
  credentialsRequired: false
});

export async function handleLogin(req, res) {
  // email, password салгаж авах
  const { email, password } = req.body;

  // Хэрэглэгчийг имэйлээр базаас шүүж авах
  const user = await getUserByEmail(email);

  // Шүүсэн хэрэглэгчийн нууц үг нь ирсэн нууц үгтэй тэнцүү эсэх
  // Тэнцүү биш бол олдсонгүй response буцаах
  if (!user || user.password !== password) {
    return res.sendStatus(401);
  }

  // Тэнцүү бол токенийг sign хийж үүсгээд response руу хийж буцаах
  const data = { sub: user.id, email: user.email, classId: user.classId };
  const token = jwt.sign(data, secret);

  res.json({ token });
}
