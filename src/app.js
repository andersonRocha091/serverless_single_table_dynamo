// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

let response;
const dynbamodbManager = require('./dynamoDbManager');
const propertyManager = require('./propertyManager');

exports.addNewProperty = async event => {
    console.log('addNewProperty');
    const propertyDetails = JSON.parse(event.body);
    const propertyRecordToSave
}

exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

