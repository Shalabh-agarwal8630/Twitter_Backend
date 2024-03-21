import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";

interface CreateTweetPayload {
  content: string;
  imageURL?: string;
}

const queries = {
  getAllTweets: () => {
    return prismaClient.tweet.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
};

const mutations = {
  createTweet: async (parent: any, { payload }: { payload: CreateTweetPayload }, ctx: GraphqlContext) => {
    // Check if the user is logged in
    if (!ctx.user) {
      throw new Error("You are not authenticated.");
    }

    const tweet = await prismaClient.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: {
          connect: { id: ctx.user.id }
        }
      }
    });

    return tweet;

  }
  

}
const extraResolvers = {
  Tweet: {
    author: async (parent: any) => {
      // Assuming parent.authorId is the author's ID
      return await prismaClient.user.findUnique({
        where: {
          id: parent.authorId
        }
      });
    }
  }
};


export const resolvers = { mutations ,extraResolvers,queries};