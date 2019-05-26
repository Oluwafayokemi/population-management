/**
 * @file location schema
 */

import LocationModel from '../../models/location';
export const resolvers = {
  Query: {
    getAllLocations: (root, args) => {
      return new Promise((resolve, reject) => {
        LocationModel.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    getOneLocation: (root, args) => {
      return new Promise((resolve, reject) => {
        LocationModel.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
  Mutation: {
    createLocation: (root, args) => {
      const {id, male_population, female_population, total_population, parent_location, sub_location } = args
      const newLocation = new LocationModel({id, male_population, female_population, total_population, parent_location, sub_location})
      return new Promise((resolve, reject) => {
        newLocation.save((err, res) => {
          err ? reject(err) : resolve(res);
        })
      })
    },

    updateLocation: (root, args) => {
      return new Promise((resolve, reject) => {
        LocationModel.findOneandUpdate({ id }, { $set: args }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        )
      })
    },

    deleteLocation: (root, args) => {
      return new Promise((resolve, reject) => {
        LocationModel.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  }
}