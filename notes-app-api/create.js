import uuid from 'uuid';
import * as dynamodb from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes-app",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createAt: Date.now()
        }
    };

    try {
        await dynamodb.call("put", params);
        return success(params.Item);
    } catch (err) {
        return failure(err);
    }
}
