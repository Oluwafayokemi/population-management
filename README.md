# population-management
Population Management App is an application that Create a Population Management System that contains a list of locations and the total number of residents in each location broken down by gender.
### Required Features
- Create a new location containing data on the total number of male and female residents within it. Please note that locations can be nested within other locations
- List all available locations and their population summaries (total male residents, total female residents, sum total residents)
- Update data for a specific locations
- Delete a specified location

### Model Requirement
#### Location:
- location
- female_population
- male_population
- total_population
_ parent_location

### Why this App is useful?
Enables Create a Population Management System that contains a list of locations and the total number of residents in each location broken down by gender. user to send and receive sms

### Tools and Technologies used
- graphql
- apollo-server-testing
- mongoose
- Babel

### Get Started
- $ git clone https://github.com/Oluwafayokemi/population-management.git

### set up database
- create an account with mlab
- create a new database
- create a collection called locations
- Authenticate by adding user to the db

### Set up Guide
- cd into the newly cloned folder
- Go into the project directory:
- create a .env file by running `touch .env` in the project directory
- copy the details in .env.example to the .env file
- paste the database url to the .env file and replace with the username and password you added as user
- Do the same for the test db - create another database and paste the url in the DB_TEST_URL

- on your terminal run

```
npm install 
```
To install all packages

```
npm test
```
To run test
```
npm run dev 
```
On your browser navigate to localhost:4000
* You should see this *
`🚀 Server ready at http://localhost:4000/`

- Open postman and test out the endpoints;

### For Api Documentation
API Endpoints
To create a location:
- on the graphql play ground running on http://localhost:4000/
- create location
```
mutation {
  createLocation(location: String, male_population: Integer, female_population: Integer){
      id
      location
      male_population
      female_population
      total_population
      parent_location
    }
  
```
- get list of locations :
```
query {
  getAllLocations{
  id
  female_population
  male_population
  total_population
  parent_location
}
```
- get one location:
```
query {
  getOneLocation(id: ID!){
  id
  male_population
  female_population
  total_population
  parent_location
}
```
- update location:
```
mutation {
  updateLocation(id: ID!, location: String!){
  id
  location
  male_population
  female_population
  total_population
  parent_location
}
```
- Delete location:
```
mutation {
  deleteLocation(id: ID!){
  id
  location
  male_population
  female_population
  total_population
  parent_location
  }
}
```
