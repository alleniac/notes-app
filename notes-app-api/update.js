import * as dynamodb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes-app",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content": data.content || null,
            ":attachment": data.attachment || null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        await dynamodb.call("update", params);
        return success({ status: true });
    } catch (error) {
        return failure({ status: false });
    }
}