# Automatic User Group Assignment Setup

## Summary

You want new users to be automatically added to the "user" group when they register in Cognito. Here are the available options:

## ✅ Recommended Solution: Lambda Post-Confirmation Trigger

### What you need to do:

1. **Create Lambda Function**

   - Function name: `cognito-post-confirmation-trigger`
   - Runtime: Node.js 18.x
   - Use the code from `lambda/post-confirmation-trigger.js`

2. **Set IAM Permissions**

   - Add policy to Lambda execution role allowing `cognito-idp:AdminAddUserToGroup`
   - Resource: `arn:aws:cognito-idp:us-east-1:*:userpool/us-east-1_7JEbEDNxI`

3. **Configure Cognito Trigger**
   - Go to User Pool → Lambda triggers → Post confirmation trigger
   - Select your Lambda function
   - Save

### Result:

- ✅ New users automatically added to "user" group after email confirmation
- ✅ Existing role detection system works immediately
- ✅ No code changes needed in the application

## 🔄 Alternative: Manual Assignment

If you can't set up Lambda triggers right now:

### AWS Console Method:

1. Go to Cognito → Users
2. Select user → Add to group → "user"

### AWS CLI Method:

```bash
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_7JEbEDNxI \
  --username [USER_EMAIL] \
  --group-name user
```

## 🧪 Testing

1. **Register a new user** through your app
2. **Confirm email**
3. **Check browser console** - should see:
   ```
   User groups: ["user"]
   Assigned role: user
   ```
4. **Verify in AWS Console** - user should be in "user" group

## 📊 Current Application Behavior

Your app now correctly handles roles based on groups:

- **Has "admin" group**: Admin access (highest priority)
- **Has "user" group only**: Regular user access
- **No groups**: Regular user access (default)
- **Has both "admin" and "user" groups**: Admin access (admin takes priority)

## 🔍 Debugging

- Check `/admin/user-management` page for debugging info (admin access required)
- Console logs show group assignments during login
- Verify groups exist in Cognito Console

## 📝 Files Created

- `lambda/post-confirmation-trigger.js` - Lambda function code
- `lambda/package.json` - Lambda dependencies
- `LAMBDA_SETUP.md` - Detailed Lambda setup instructions
- `MANUAL_GROUP_ASSIGNMENT.md` - Manual assignment guide
- `/admin/user-management` - Debug page for admins
