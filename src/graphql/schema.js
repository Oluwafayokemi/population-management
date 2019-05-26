import { gql } from 'apollo-server';

// The GraphQL schema
export const typeDefs = gql`
  type Query {
    getAllLocations: [Location]!
    getOneLocation(id: ID!): Location
    # Queries for the current user
    user: User
  }
    type Location {
      id: ID!
      male_population: Int
      female_population: Int
      total_population: Int
      parent_location: String
      sub_location: String
    }

    type User {
      id: ID!
      name: String
      email: String!
      role: String
    }

    type Mutation {
      # if false, Location fails to create -- check errors
      createLocation(
        male_population: Int,
        female_population: Int, 
        total_population: Int, 
        parent_location: String, 
        sub_location: String
        ): Location!
    
      # if false, cancellation failed -- check errors
      updateLocation(locationId: ID!): LocationUpdateResponse!

      # if false, cancellation failed -- check errors
      deleteLocation(locationId: ID!): LocationUpdateResponse!

      signup(name: String, email: String!, role: String!, password: String!): UserUpdateResponse
      login(email: String!, password: String!): UserUpdateResponse # login token
    }
  
    type LocationUpdateResponse {
      success: Boolean
      message: String
      getAllLocations: [Location]
    }

    type UserUpdateResponse {
      success: Boolean
      message: String
      user: [User]
    }
`;
