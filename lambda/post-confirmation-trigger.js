const {
	CognitoIdentityProviderClient,
	AdminAddUserToGroupCommand
} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoClient = new CognitoIdentityProviderClient({
	region: process.env.AWS_REGION
});

exports.handler = async (event) => {
	console.log(
		"Post confirmation trigger event:",
		JSON.stringify(event, null, 2)
	);

	try {
		// Add user to the 'user' group by default
		const addToGroupParams = {
			GroupName: "user",
			Username: event.userName,
			UserPoolId: event.userPoolId
		};

		const command = new AdminAddUserToGroupCommand(addToGroupParams);
		await cognitoClient.send(command);

		console.log(`Successfully added user ${event.userName} to 'user' group`);

		return event;
	} catch (error) {
		console.error("Error adding user to group:", error);
		// Don't fail the confirmation process, just log the error
		return event;
	}
};
