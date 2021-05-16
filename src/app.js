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

exports.getBookedPropertiesForUsers = async event => {
    console.log('getBookedPropertiesForUsers');
    const userId = event.queryStringParameters.userId;
    const bookedPropertiesForUsersFromDynamoDB = await dynamodbManager.queryByIndex(userId,'userId');
    const bookedProperties = propertyManager.cleanUpBookingResults(bookedPropertiesForUsersFromDynamoDB);

    return {
        statusCode:200,
        body:JSON.stringify(bookedProperties),
        headers:{}
    }

}

exports.searchByLocation = async event => {
    console.log('Search by location');

    const {country, city} = event.queryStringParameters
    const primaryKey = `${country}_${city}`;
    const propertiesFromDynamoDB = await dynamodbManager.queryByIndex(primaryKey,'country_city');
    const properties = propertyManager.cleanUpPropertyByResults(propertiesFromDynamoDB);

    return {
        statusCode: 200,
        body: JSON.stringify(properties),
        headers:{}
    }

}

exports.getBookedDatesProperty = async event => {
    console.log('getBookedDatesProperty');
    const propertyId = event.queryStringParameters.propertyId;
    const bookedPropertyFromDynamoDb = await dynamodbManager.queryTable(propertyId,'propertyId')
    const bookedDates = propertyManager.cleanUpBookingResults(bookedPropertyFromDynamoDb);

    return {
        statusCode: 200,
        body: JSON.stringify(bookedDates),
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

