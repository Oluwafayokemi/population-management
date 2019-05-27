import { createTestClient } from 'apollo-server-testing';
import { server } from '../index'
const { query, mutate } = createTestClient(server);
import { gql } from 'apollo-server';
import mongoose from "mongoose";
import 'dotenv/config';

const GET_ALL_LOCATIONS = gql`
  query getAllLocations {
    getAllLocations {
      location
      male_population
      female_population
      total_population
      parent_location
    }
  }
`;
const GET_ONE_LOCATION = gql`
  query getOneLocation($id: ID!) {
    getOneLocation(id: $id) {
      location
      male_population
      female_population
      total_population
      parent_location
      }
    }
`;

const CREATE_LOCATION = gql`
  mutation createLocation($location: String, $male_population: Int, $female_population: Int, $parent_location: String) {
    createLocation(location: $location, male_population: $male_population, female_population: $female_population, parent_location: $parent_location){
      location
      male_population
      female_population
      total_population
      parent_location
    }
  }
`;

const UPDATE_LOCATION = gql`
  mutation updateLocation($id: ID, $location: String, $male_population: Int, $female_population: Int, $parent_location: String ) {
    updateLocation(id: $id, location: $location, male_population: $male_population, female_population: $female_population, parent_location: $parent_location){
      id
      location
      male_population
      female_population
      total_population
      parent_location
    }
  }
`;

const DELETE_LOCATION = gql`
  mutation deleteLocation($id: ID){
    deleteLocation(id: $id){
      id
      location
      male_population
      female_population
      total_population
      parent_location
    }
  }
`;

describe('Drop database', () => {

  beforeAll((done) => {
    mongoose.connect(process.env.DB_TEST_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      db.db.dropDatabase(() => {
        done();
      });
    });
  });

  afterAll(() => mongoose.disconnect());

  describe('Queries before creating location', () => {
    it('fetches list of locations when there is no location', async (done) => {
      const res = await query({
        query: GET_ALL_LOCATIONS,
      });
      expect(res.errors[0].message).toEqual('Failed to get locations because none has been created')
      done();
    })

    it('fetch single location when the id does not exist', async (done) => {
      const res = await query({
        query: GET_ONE_LOCATION,
        variables: { id: "2" }
      });
      expect(res.errors[0].message).toEqual('Failed to get the location due to validation errors')
      done();
    })
  });

  describe('Mutations', () => {
    it('returns validation error when location is not supplied', async (done) => {
      const res = await mutate({
        mutation: CREATE_LOCATION,
        variables: { male_population: 27, female_population: 37 }
      });
      expect(res.errors[0].message).toEqual('Failed to create location because location field is required');
      done();
    })

    it('Create location successfully', async (done) => {
      const res = await mutate({
        mutation: CREATE_LOCATION,
        variables: { location: "Abuja", male_population: 27, female_population: 37 }
      });
      const createdData = {
        location: 'Abuja',
        male_population: 27,
        female_population: 37,
        total_population: 64,
        parent_location: null
      }
      expect(res.data.createLocation).toEqual(createdData)
      done();
    })

    it('Create location successfully', async (done) => {
      const res = await mutate({
        mutation: CREATE_LOCATION,
        variables: { location: "Abuja", male_population: 27, female_population: 37, parent_location: '3' }
      });
      expect(res.errors[0].message).toEqual('The parent location does not exist')
      done();
    })

    it('Update location without an id', async (done) => {
      const res = await mutate({
        mutation: UPDATE_LOCATION,
        variables: { location: "mere" }
      });
      expect(res.errors[0].message).toEqual('Can not update because id is required')
      done();
    })

    it('Update location with invalid id', async (done) => {
      const res = await mutate({
        mutation: UPDATE_LOCATION,
        variables: { id: 3, location: "mere" }
      });
      expect(res.errors[0].message).toEqual('The location does not exist')
      done();
    })

    it('Delete location without an id', async (done) => {
      const res = await mutate({
        mutation: DELETE_LOCATION,
        variables: {}
      });
      expect(res.errors[0].message).toEqual('id is not defined')
      done();
    })

    it('Delete location with invalid id', async (done) => {
      const res = await mutate({
        mutation: DELETE_LOCATION,
        variables: { id: 4 }
      });
      expect(res.errors[0].message).toEqual('id is not defined')
      done();
    })

  });

  describe('Queries after creating location', () => {
    it('fetches list of locations successfully', async (done) => {
      const res = await query({
        query: GET_ALL_LOCATIONS,
      });
      const locations = [{
        location: 'Abuja',
        male_population: 27,
        female_population: 37,
        total_population: 64,
        parent_location: null
      }]
      expect(res.data.getAllLocations).toEqual(locations)
      done();
    })
  })
})
