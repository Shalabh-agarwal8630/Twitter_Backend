import { User } from "@prisma/client";
import { prismaClient } from "../clients/db";
import JWT from "jsonwebtoken";
const JWT_Secret = "Venom"
class JWTService {
  public static generateTokenForUser(user: User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    }

    const token = JWT.sign(payload, JWT_Secret)
    return token;
  }


}

export default JWTService
