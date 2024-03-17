import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";

interface GoogleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    try {
      const googletoken = token;
      console.log("Here is the ", googletoken);
      //we will generrate a url
      const googleOauthUrl = new URL('https://oauth2.googleapis.com/tokeninfo')

      googleOauthUrl.searchParams.set('id_token', googletoken)

      const { data } = await axios.get<GoogleTokenResult>
        (googleOauthUrl.toString(),
          { responseType: "json" }
        )

      console.log("ye raha data")
      console.log(data);
      const user = await prismaClient.user.findUnique({
        where: { email: data.email }
      })

      if (!user) {
        await prismaClient.user.create({
          data: {
            email: data.email,
            firstName: data.given_name,
            lastName: data.family_name,
            profileImageUrl: data.picture || "/default-url.jpg",
          }
        })
      }
      const userInDb = await prismaClient.user.findUnique({
        where: { email: data.email }
      })
      if (!userInDb) {
        throw new Error("User with email not found")
      }

      const userToken = JWTService.generateTokenForUser(userInDb)
      return userToken;
    }
    catch (error) {
      console.error("Error during Google token verification:", error);
      throw new Error("Error verifying Google token");
    }

  },

  getCurrentUser:async(parent:any,args:any,ctx:GraphqlContext)=>{
   console.log(ctx)
    const id=ctx.user?.id;
    if(!id)
    {
      return null;  
    }
    const user=await prismaClient.user.findUnique({
      where:{
        id
      }
    })
    return user;
  }

}



export const resolvers = { queries }