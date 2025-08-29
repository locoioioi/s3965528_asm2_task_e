# AWS Cognito Lambda Trigger Setup

## Overview

This Lambda function automatically adds new users to the 'user' group when they confirm their registration.

## Setup Instructions

### 1. Create the Lambda Function

1. Go to AWS Lambda Console
2. Click "Create function"
3. Choose "Author from scratch"
4. Function name: `cognito-post-confirmation-trigger`
5. Runtime: `Node.js 18.x` or later
6. Create function

### 2. Upload the Code

1. Copy the code from `lambda/post-confirmation-trigger.js`
2. Paste it into the Lambda function code editor
3. Update the dependencies in package.json if needed
4. Deploy the function

### 3. Configure IAM Permissions

The Lambda function needs permission to add users to groups. Add this policy to the Lambda execution role:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": ["cognito-idp:AdminAddUserToGroup"],
			"Resource": "arn:aws:cognito-idp:us-east-1:*:userpool/us-east-1_7JEbEDNxI"
		}
	]
}
```

### 4. Set Up the Cognito Trigger

1. Go to AWS Cognito Console
2. Select your User Pool (us-east-1_7JEbEDNxI)
3. Go to "User pool properties" → "Lambda triggers"
4. Find "Post confirmation trigger"
5. Select your Lambda function: `cognito-post-confirmation-trigger`
6. Save changes

### 5. Test

1. Register a new user through your application
2. Confirm the registration
3. Check the user in Cognito Console - they should now be in the 'user' group

## Alternative: Manual Group Assignment

If you can't set up Lambda triggers, you can manually add users to groups through:

1. **AWS Console**: Cognito → Users → Select user → Add to group
2. **AWS CLI**:
   ```bash
   aws cognito-idp admin-add-user-to-group \
     --user-pool-id us-east-1_7JEbEDNxI \
     --username [username] \
     --group-name user
   ```

## Notes

- Users will be added to the 'user' group by default
- To make someone an admin, manually add them to the 'admin' group
- If a user is in both groups, they will have admin privileges (as per the application logic)
