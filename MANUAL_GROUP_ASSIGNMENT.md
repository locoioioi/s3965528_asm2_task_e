# Manual User Group Assignment Guide

## Using AWS CLI

### Prerequisites

- Install AWS CLI
- Configure with appropriate credentials
- Have admin permissions for Cognito

### Commands

#### Add user to 'user' group:

```bash
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_7JEbEDNxI \
  --username [USER_EMAIL_OR_USERNAME] \
  --group-name user
```

#### Add user to 'admin' group:

```bash
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_7JEbEDNxI \
  --username [USER_EMAIL_OR_USERNAME] \
  --group-name admin
```

#### List users in a group:

```bash
aws cognito-idp list-users-in-group \
  --user-pool-id us-east-1_7JEbEDNxI \
  --group-name user
```

#### Check user's groups:

```bash
aws cognito-idp admin-list-groups-for-user \
  --user-pool-id us-east-1_7JEbEDNxI \
  --username [USER_EMAIL_OR_USERNAME]
```

## Using AWS Console

1. Go to AWS Cognito Console
2. Select User Pool: `us-east-1_7JEbEDNxI`
3. Go to "Users" tab
4. Find and click on the user
5. Scroll down to "Group memberships"
6. Click "Add user to group"
7. Select "user" group
8. Click "Add"

## Batch Operations

If you need to add multiple existing users to the 'user' group, you can create a script:

```bash
#!/bin/bash
USER_POOL_ID="us-east-1_7JEbEDNxI"

# List of usernames/emails
USERS=(
  "user1@example.com"
  "user2@example.com"
  # Add more users as needed
)

for username in "${USERS[@]}"; do
  echo "Adding $username to user group..."
  aws cognito-idp admin-add-user-to-group \
    --user-pool-id $USER_POOL_ID \
    --username "$username" \
    --group-name user
done
```

## Testing the Role System

After adding users to groups, test that the role system works:

1. **User with 'user' group**: Should have regular user access
2. **User with 'admin' group**: Should have admin access
3. **User with both groups**: Should have admin access (higher privilege)
4. **User with no groups**: Will default to 'user' role in the application
