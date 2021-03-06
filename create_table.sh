aws \
  --endpoint-url=http://localhost:4566 \
  dynamodb create-table --table-name PropertiesTableGSI \
  --attribute-definitions \
   AttributeName=propertyId,AttributeType=S \
   AttributeName=sortKey,AttributeType=S \
   AttributeName=country_city,AttributeType=S \
   AttributeName=userId,AttributeType=S \
   AttributeName=startBookingDate,AttributeType=S \
   AttributeName=ownerId,AttributeType=S \
  --key-schema \
   AttributeName=propertyId,KeyType=HASH \
   AttributeName=sortKey,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --stream-specification StreamEnabled=TRUE,StreamViewType=NEW_AND_OLD_IMAGES \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes \
    "[
        {
            \"IndexName\": \"Properties_GSI1\",
            \"KeySchema\": [{\"AttributeName\":\"country_city\",\"KeyType\":\"HASH\"},
                            {\"AttributeName\":\"propertyId\",\"KeyType\":\"RANGE\"}],
            \"Projection\":{
                \"ProjectionType\":\"INCLUDE\",
                \"NonKeyAttributes\":[\"ownerId\",\" title\", \"description\", \"city\", \"country\"]
            }
        },
        {
            \"IndexName\": \"Properties_GSI2\",
            \"KeySchema\": [{\"AttributeName\":\"userId\",\"KeyType\":\"HASH\"},
                            {\"AttributeName\":\"startBookingDate\",\"KeyType\":\"RANGE\"}],
            \"Projection\":{
                \"ProjectionType\":\"INCLUDE\",
                \"NonKeyAttributes\":[\"propertyId\",\"endBookingDate\"]
            }
        },
        {
            \"IndexName\": \"Properties_GSI3\",
            \"KeySchema\": [{\"AttributeName\":\"ownerId\",\"KeyType\":\"HASH\"},
                            {\"AttributeName\":\"propertyId\",\"KeyType\":\"RANGE\"}],
            \"Projection\":{
                \"ProjectionType\":\"INCLUDE\",
                \"NonKeyAttributes\":[\"title\",\"descrition\",\"city\",\"country\"]
            }
        }
    ]"