import { client } from './dynamoClient.js';
import {
  CreateTableCommand,
  DescribeTableCommand,
  PutItemCommand,
  GetItemCommand,
  GetItemCommandOutput,
  QueryCommandOutput,
  QueryCommand,
  ScanCommand,
  ScanOutput,
} from '@aws-sdk/client-dynamodb';

const checkTableParams = {
  TableName: 'WebPageData',
};

const createTableParams = {
  TableName: 'WebPageData',
  KeySchema: [
    { AttributeName: 'Url', KeyType: 'HASH' },
    { AttributeName: 'DateCrawled', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'Url', AttributeType: 'S' },
    { AttributeName: 'DateCrawled', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

const describeTableCommand = new DescribeTableCommand(checkTableParams);
const createTableCommand = new CreateTableCommand(createTableParams);

export async function checkAndCreateTable(): Promise<void> {
  try {
    const data = await client.send(describeTableCommand);
    console.log(
      'Table already exists. Table description:',
      JSON.stringify(data, null, 2),
    );
  } catch (err) {
    if (err.name === 'ResourceNotFoundException') {
      // Table doesn't exist, creating a new table
      try {
        const data = await client.send(createTableCommand);
        console.log(
          'Created table. Table description:',
          JSON.stringify(data, null, 2),
        );
      } catch (err) {
        console.error(
          'Unable to create table. Error:',
          JSON.stringify(err, null, 2),
        );
      }
    } else {
      console.error(
        'Unable to describe table. Error:',
        JSON.stringify(err, null, 2),
      );
    }
  }
}

export async function putItem(url: string, dateCrawled: string, data: string): Promise<void> {
  const params = {
    TableName: 'WebPageData',
    Item: {
      Url: { S: url },
      DateCrawled: { S: dateCrawled },
      Data: { S: data },
    },
  };
  const putItemCommand = new PutItemCommand(params);
  console.log('Putting item:', JSON.stringify(params, null, 2));
  await client.send(putItemCommand);
}

export async function getItem(url: string, dateCrawled: string): Promise<GetItemCommandOutput> {
  const params = {
    TableName: 'WebPageData',
    Key: {
      Url: { S: url },
      DateCrawled: { S: dateCrawled },
    },
  };
  const getItemCommand = new GetItemCommand(params);
  console.log('Getting item:', JSON.stringify(params, null, 2));
  const data = await client.send(getItemCommand);
  console.log('Get item returned data:', JSON.stringify(data, null, 2));
  return data;
}

export async function getByUrl(url: string): Promise<QueryCommandOutput> {
  const params = {
    TableName: 'WebPageData',
    KeyConditionExpression: '#url = :url',
    ExpressionAttributeValues: {
      ':url': { S: url },
    },
    ExpressionAttributeNames: {
      '#url': 'Url',
    },
  };
  const queryCommand = new QueryCommand(params);
  console.log('Getting item:', JSON.stringify(params, null, 2));
  const data = await client.send(queryCommand);
  console.log('Get item returned data:', JSON.stringify(data, null, 2));
  return data;
}

export async function scanTable(): Promise<ScanOutput> {
  const params = {
    TableName: 'WebPageData',
  };
  const scanCommand = new ScanCommand(params);
  return client.send(scanCommand);
}
