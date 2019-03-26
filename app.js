const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index')

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql', 
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb://192.168.1.114:27017/events-react-dev`).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});