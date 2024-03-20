export const types =
 `
 input CreateTweetData{
  content :String!
  imageURL:String
 }
 
 
 type Tweet{
 id: ID!
 content:String!
 author:User 
 imageUrl:String 

}
`;