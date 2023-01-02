import { APIGatewayProxyHandler } from "aws-lambda";
import { client } from "../utils/dynamodbClient";
import { v4 as uuid } from "uuid";

interface IRequest {
  title: string;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as IRequest;
  const id = uuid();

  await client
    .put({
      TableName: "users_todo",
      Item: {
        id,
        userId,
        title: title,
        deadline: new Date(Number(deadline)).toString(),
        done: "false",
      },
    })
    .promise();

  const response = await client
    .query({
      TableName: "users_todo",
      KeyConditionExpression: "id = :id AND userId = :userId",
      ExpressionAttributeValues: {
        ":id": id,
        ":userId": userId,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items[0]),
  };
};
