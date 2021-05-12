aws \
  --endpoint-url=http://localhost:4566 \
  dynamodb create-table --table-name PropertiesTableGSI \
  --attribute-definitions \
   AttributeName=propertyId,AttributeType=S \
   AttributeName=sortKey,AttributeType=S \
  --key-schema \
   AttributeName=propertyId,KeyType=HASH \
   AttributeName=sortKey,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --stream-specification StreamEnabled=TRUE,StreamViewType=NEW_AND_OLD_IMAGES \
  --billing-mode PAY_PER_REQUEST \