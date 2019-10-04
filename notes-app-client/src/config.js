// typo here: should be notes-app... too late to make the change
export default {
    s3: {
        REGION: 'us-east-2',
        BUCKET: 'nodes-app-upload-contents'
    },
    apiGateway: {
        REGION: 'us-east-2',
        URL: 'https://zrc97wzel1.execute-api.us-east-2.amazonaws.com/prod/'
    },
    cognito: {
        REGION: 'us-east-2',
        USER_POOL_ID: 'us-east-2_ONw5fE0zg',
        APP_CLIENT_ID: '4l3a34o28nn9qma5bc2enkvo6g',
        IDENTITY_POOL_ID: 'us-east-2:1e4c5c36-f331-4865-bc4a-5337d56a68b4'
    }
}