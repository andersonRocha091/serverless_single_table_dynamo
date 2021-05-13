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

module.exports.createBookRecordToSave = bookingDetails => {
  bookingDetails.propertyId = bookingDetails.propertyId;
  bookingDetails.sortKey = bookingDetails.startBookingDate;
  console.log('Booking details: ',bookingDetails);
  return bookingDetails;
}