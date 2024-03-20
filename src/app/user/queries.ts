export const queries=`#graphql
verifyGoogleToken(token:String!):String
getCurrentUser:User
`;

// Query:

// What it is: A query is a request for specific data from a GraphQL API. It describes the information you want to retrieve and the structure in which you want to receive it.
// Example: If you want to get a user's name and email, you might write a query like this: query { user { name, email } }.
// Resolver:

// What it is: A resolver is like a function that knows how to fulfill or resolve a specific part of a query. It contains the logic to fetch the requested data from a data source, like a database.
// Example: If the query asks for a user's name, there would be a resolver function specifically designed to fetch that user's name from the database and return it.
// In Simple Terms:

// Query is like asking a question.
// Resolver is like someone who knows how to find the answer to that specific question