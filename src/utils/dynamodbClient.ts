import { DynamoDB } from "aws-sdk";
const options = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "x",
  secretAccessKey: "x",
};
export const client = new DynamoDB.DocumentClient(options);
