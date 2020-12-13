const { query, Client } = require('faunadb')
const querystring = require('querystring')
require('dotenv').config()
/* configure faunaDB Client with our secret */
const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  keepAlive:false,
})

/* export our lambda function as named "handler" export */
const handler = async (event, context) => {

  //TODO: check using netlify identity but for some reason clientContext doesn't work locally
  const {identity, user} = context.clientContext;

  //TODO: user doesn't show on production
  console.log(user)

  //TODO: identity does show in producution but not in dev
  console.log(identity)
  formdata=querystring.decode(event.body)
  
  /* parse the string body into a useable JS object */
 
  const item = {
    data:formdata
  }

  if(identity!=null){
  /* construct the fauna query */
  return client
    .query(query.Create(query.Collection('SubmittedArticles'), item))
    .then((response) => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
  }
  else{
    return {
      statusCode:401,
      body: JSON.stringify('Login with netlify identity')
    }
  }
}

module.exports = { handler }
