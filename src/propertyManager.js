module.exports.createPropertyRecordToSave = propertyDetails => {
  propertyDetails.propertyId = propertyDetails.propertyId;
  propertyDetails.sortKey = 'property';
  propertyDetails.country_city = `${propertyDetails.country}_${propertyDetails.city}`;
  console.log('Property details: ', propertyDetails);
  return propertyDetails;
};

module.exports.cleanUpProperty = propertyFromDynamo => {
  return {
    propertyId: propertyFromDynamo.propertyId,
    ownerId: propertyFromDynamo.ownerId,
    city: propertyFromDynamo.city,
    country: propertyFromDynamo.country,
    title: propertyFromDynamo.title,
    description: propertyFromDynamo.description
  }
}

module.exports.cleanUpPropertyByResults = propertiesFromDynamoDB => {
  return propertiesFromDynamoDB.map(property => {
    return this.cleanUpProperty(property);
  })
}

module.exports.cleanUpBookingResults = bookingFromDynamo => {
  return bookingFromDynamo.map(booking => {
    return this.cleanUpBooking(booking);
  })
}

module.exports.cleanUpBooking = bookingFromDynamo => {
  if((bookingFromDynamo.sortKey == undefined) || (bookingFromDynamo.sortKey !== 'property')){
    console.log('a');
    console.log(bookingFromDynamo);
    return {
      userId: bookingFromDynamo.userId,
      propertyId: bookingFromDynamo.propertyId,
      startBookingDate: bookingFromDynamo.startBookingDate,
      endBookingDate: bookingFromDynamo.endBookingDate
    }
  }
}

module.exports.createBookRecordToSave = bookingDetails => {
  bookingDetails.propertyId = bookingDetails.propertyId;
  bookingDetails.sortKey = bookingDetails.startBookingDate;
  console.log('Booking details: ',bookingDetails);
  return bookingDetails;
}