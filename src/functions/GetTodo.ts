import { APIGatewayProxyHandler } from "aws-lambda";
import { client } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;

  const response = await client
    .query({
      TableName: "users_todo",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items[0]),
  };
};
