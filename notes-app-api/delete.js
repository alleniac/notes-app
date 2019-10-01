import * as dynamodb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
    const params = {
        TableName: "notes-app",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        await dynamodb.call("delete", params);
        return success({ status: true });
    } catch (error) {
        return failure({ status: false });
    }
}