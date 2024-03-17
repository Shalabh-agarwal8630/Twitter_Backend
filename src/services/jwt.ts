import { User } from "@prisma/client";
import JWT from "jsonwebtoken";
import { JWTuser } from "../interfaces";
const JWT_Secret = "Venom"
class JWTService {
  public static generateTokenForUser(user: User) {
    const payload: JWTuser = {
      id: user?.id,
      email: user?.email,
    }

    const token = JWT.sign(payload, JWT_Secret)
    return token;
  }

  public static decodeToken(token: string) {
    try{
      return JWT.verify(token, JWT_Secret) as JWTuser;
    }
    catch(err)
    {
      return null;
    }
  }


}

export default JWTService
