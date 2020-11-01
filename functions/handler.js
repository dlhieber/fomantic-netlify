require('dotenv').config()
const secretKey = process.env.SECRET_KEY


exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'A Test'
        })
    }
}