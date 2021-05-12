module.exports.createPropertyRecordToSave = propertyDetails => {
  propertyDetails.propertyId = propertyDetails.propertyId;
  propertyDetails.sortKey = 'property';
  propertyDetails.country_city = `${propertyDetails.country}_${propertyDetails.city}`;
  console.log('Property details: ', propertyDetails);
  return propertyDetails;
};