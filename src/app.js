// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

let response;
const dynamodbManager = require('./dynamoDbManager');
const propertyManager = require('./propertyManager');

exports.getProperty = async event => {
    console.log('getProperty');
    const primaryKey = event.queryStringParameters.propertyId;
    const sortKey = "property";
    const propertyFromDynamoDb = await dynamodbManager.getItem(primaryKey,sortKey);
    const property = propertyManager.cleanUpProperty(propertyFromDynamoDb);

    return {
        statusCode: 200,
        body: JSON.stringify(property),
        headers: {}
    }
}

exports.bookProperty = async event => {
    console.log('bookProperty');
    const { userId, propertyId, startBookingDate, endBookingDate } = event.queryStringParameters
    const booking = { userId, propertyId, startBookingDate, endBookingDate };
    const bookingRecordToSave = propertyManager.createBookRecordToSave(booking);
    const result = await dynamodbManager.saveItem(bookingRecordToSave);

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers:{}
    }
}

exports.addNewProperty = async event => {
    console.log(event);
    const propertyDetails = JSON.parse(event.body);
    const propertyRecordToSave = propertyManager.createPropertyRecordToSave(propertyDetails);
    const result = await dynamodbManager.saveItem(propertyRecordToSave);
    console.log("RESULT: ", JSON.stringify(result));
    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers:{}
    }
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

