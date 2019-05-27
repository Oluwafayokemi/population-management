import createTestClient from 'apollo-server-testing';
const { query, mutate } = createTestClient(server);

const GET_ALL_LOCATIONS = gql`
  query getAllLocations($after: String) {
    getAllLocations(after: $after) {
      
      }
    }
  }
`;
