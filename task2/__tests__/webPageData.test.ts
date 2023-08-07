import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand, } from "@aws-sdk/client-dynamodb";
import * as dynamodbOperations from '../src/data-access.js';

const ddbMock = mockClient(DynamoDBClient);

describe('DynamoDB operations', () => {

  beforeEach(() => {
    ddbMock.reset();
  });

  it('should get domain data', async () => {
    ddbMock.on(GetItemCommand).resolves({
      Item: { Url: { S: "google.com" }, DateCrawled: { S: "2023-08-06T00:00:00.000Z" }, Data: { S: "test data" } },
    });

    const result = await dynamodbOperations.getItem("google.com", "2023-08-06T00:00:00.000Z");
    expect(result.Item).toEqual({
      Url: { S: "google.com" },
      DateCrawled: { S: "2023-08-06T00:00:00.000Z" },
      Data: { S: "test data" },
    });
  });

  it('should get domain data by url', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [{ Url: { S: "google.com" }, DateCrawled: { S: "2023-08-06T00:00:00.000Z" }, Data: { S: "test data" } }],
    });

    const result = await dynamodbOperations.getByUrl("google.com");
    expect(result.Items[0]).toEqual({
      Url: { S: "google.com" },
      DateCrawled: { S: "2023-08-06T00:00:00.000Z" },
      Data: { S: "test data" },
    });
  });

  it('should put domain data and get it', async () => {
    ddbMock.on(PutItemCommand).resolves({});

    await dynamodbOperations.putItem("google.com", "2023-08-06T00:00:00.000Z", "test data");

    ddbMock.on(GetItemCommand).resolves({
      Item: { Url: { S: "google.com" }, DateCrawled: { S: "2023-08-06T00:00:00.000Z" }, Data: { S: "test data" } },
    });

    const result = await dynamodbOperations.getItem("google.com", "2023-08-06T00:00:00.000Z");
    expect(result.Item).toEqual({
      Url: { S: "google.com" },
      DateCrawled: { S: "2023-08-06T00:00:00.000Z" },
      Data: { S: "test data" },
    });
  });
});
