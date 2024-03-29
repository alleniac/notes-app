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
        let result = await dynamodb.call("get", params);
        if (result.Item) {
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found" });
        }
    } catch (error) {
        return failure({ status: false, error });
    }
}