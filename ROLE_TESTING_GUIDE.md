# Role Assignment Testing Scenarios

## Test Cases

### Test Case 1: User with No Groups

- **Setup**: Create user, don't add to any groups
- **Expected Result**: Role = "user" (regular user)
- **Console Output**:
  ```
  User groups: []
  Assigned role: user
  ```

### Test Case 2: User with "user" Group Only

- **Setup**: Add user to "user" group only
- **Expected Result**: Role = "user" (regular user)
- **Console Output**:
  ```
  User groups: ["user"]
  Assigned role: user
  ```

### Test Case 3: User with "admin" Group Only

- **Setup**: Add user to "admin" group only
- **Expected Result**: Role = "admin" (administrator)
- **Console Output**:
  ```
  User groups: ["admin"]
  Assigned role: admin
  ```

### Test Case 4: User with Both Groups

- **Setup**: Add user to both "user" and "admin" groups
- **Expected Result**: Role = "admin" (admin takes priority)
- **Console Output**:
  ```
  User groups: ["user", "admin"]
  Assigned role: admin
  ```
  OR
  ```
  User groups: ["admin", "user"]
  Assigned role: admin
  ```

## How to Test

### 1. Register a Test User

1. Go to `/register`
2. Create account with test email
3. Verify email
4. Check console logs during login

### 2. Modify Groups (AWS Console)

1. Go to AWS Cognito Console
2. Navigate to your User Pool
3. Go to "Users" tab
4. Select the test user
5. Modify group memberships
6. Re-login to see role changes

### 3. Modify Groups (AWS CLI)

```bash
# Add to admin group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_7JEbEDNxI \
  --username [USER_EMAIL] \
  --group-name admin

# Remove from admin group
aws cognito-idp admin-remove-user-from-group \
  --user-pool-id us-east-1_7JEbEDNxI \
  --username [USER_EMAIL] \
  --group-name admin

# Add to user group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id us-east-1_7JEbEDNxI \
  --username [USER_EMAIL] \
  --group-name user
```

### 4. Verify Access

- **Regular Users**: Can access general pages, not admin pages
- **Admin Users**: Can access all pages including `/admin/*`

## Expected Behavior Summary

| Groups              | Result  | Access Level              |
| ------------------- | ------- | ------------------------- |
| None                | `user`  | Regular user pages only   |
| `["user"]`          | `user`  | Regular user pages only   |
| `["admin"]`         | `admin` | All pages including admin |
| `["user", "admin"]` | `admin` | All pages including admin |

## Debugging Tips

1. **Check browser console** during login for group/role logs
2. **Use `/admin/user-management`** page for debugging info
3. **Verify groups in AWS Console** - Groups tab in User Pool
4. **Test navigation** - Try accessing admin pages to verify role restrictions
