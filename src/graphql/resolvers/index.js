/**
 * @file location schema
 */

import LocationModel from '../../models/location';
import { randomNumber } from '../../utils';
import { UserInputError } from 'apollo-server';

let validationErrors = {}
export const resolvers = {
  Query: {
    getAllLocations: async (root, args) => {
      const locations = await LocationModel.find()
      if (!locations[0]) {
        throw new Error('Failed to get locations because none has been created');
      }
      return locations
    },

    getOneLocation: async (root, args) => {
      const location = await LocationModel.findOne(args)
      if (!location) {
        validationErrors.id = "The location does not exist"
      }
      if (Object.keys(validationErrors).length > 0) {
        throw new UserInputError(
          'Failed to get the location due to validation errors',
          { validationErrors }
        );
      }
      return location
    }
  },

  Mutation: {
    createLocation: async (root, args) => {
      const { location, male_population, female_population, parent_location } = args
      const female = female_population && parseInt(female_population, 10)
      const male = male_population && parseInt(male_population, 10)
      const total = female_population && male_population && female + male;
      const id = randomNumber(10);
      if (!location) {
        throw new Error('Failed to create location because location field is required')
      }
      const newlyCreated = new LocationModel({ id, location, male_population: male, female_population: female, total_population: total, parent_location })
      const findLocation = parent_location ? await LocationModel.findOne({ id: { $eq: parseInt(parent_location, 10) } }) : { location: "exist" }
      if (!findLocation) {
        throw new Error('The parent location does not exist')
      }

      const newLocation = await newlyCreated.save()
      return newLocation;
    },

    updateLocation: async (root, args) => {
      const { id } = args
      if (!id) {
        throw new Error('Can not update because id is required')
      }
      const findLocation = await LocationModel.findOne({id})
      if(!findLocation) {
        throw new Error('The location does not exist')
      }
      const updatedLocation = await LocationModel.findOneAndUpdate({ id }, { $set: args }, { new: true });
      return updatedLocation
    },

    deleteLocation: async (root, args) => {      
      if (!id) {
        throw new Error('Can not delete location because id is required')
      }
      const findLocation = await LocationModel.findOne(args)
      if(!findLocation) {
        throw new Error('Can not delete location because it does not exist')
      }
      const deleted = await LocationModel.findOneAndRemove(args)
      return deleted;
    }
  }
}