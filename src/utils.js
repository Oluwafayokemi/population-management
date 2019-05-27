/**
 * @file utils
 */

/**
 * @function randomNumber
 * @description a function to generate random number within any legth assigned to it
 * @param {Number} length 
 * @return  Random Numbers
 */
export const randomNumber = (length) => {
  let result = 0;
  for (let i = length; i > 0; i--) {
    result += [Math.floor(Math.random() * length)];
  }
  return result;
}