# Environment Variables Configuration

This application uses environment variables to manage different deployment environments (development, staging, production).

## Setup Instructions

### 1. Local Development

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your local development settings:

```env
# Local Development Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_7JEbEDNxI
NEXT_PUBLIC_COGNITO_CLIENT_ID=62doa0cn2vvgu9is2ctp515ui2
NEXT_PUBLIC_COGNITO_DOMAIN=us-east-17jebednxi.auth.us-east-1.amazoncognito.com
```

### 2. Production Deployment

For production (e.g., AWS Amplify), set these environment variables in your deployment platform:

```env
NEXT_PUBLIC_APP_URL=https://master.dtetzynlrj82j.amplifyapp.com
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_7JEbEDNxI
NEXT_PUBLIC_COGNITO_CLIENT_ID=62doa0cn2vvgu9is2ctp515ui2
NEXT_PUBLIC_COGNITO_DOMAIN=us-east-17jebednxi.auth.us-east-1.amazoncognito.com
```

## Environment Variables Reference

### Required Variables

| Variable                           | Description                  | Example                                     |
| ---------------------------------- | ---------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`              | Base URL of your application | `http://localhost:3000`                     |
| `NEXT_PUBLIC_COGNITO_USER_POOL_ID` | AWS Cognito User Pool ID     | `us-east-1_7JEbEDNxI`                       |
| `NEXT_PUBLIC_COGNITO_CLIENT_ID`    | AWS Cognito App Client ID    | `62doa0cn2vvgu9is2ctp515ui2`                |
| `NEXT_PUBLIC_COGNITO_DOMAIN`       | AWS Cognito Domain           | `your-domain.auth.region.amazoncognito.com` |

### Generated URLs

The application automatically constructs OAuth redirect URLs from `NEXT_PUBLIC_APP_URL`:

- **Authorization Callback**: `${NEXT_PUBLIC_APP_URL}/authorization`
- **Sign-out Callback**: `${NEXT_PUBLIC_APP_URL}/logout`

## AWS Cognito Configuration

### Update Cognito OAuth Settings

You need to update your AWS Cognito User Pool with the callback URLs for each environment:

#### Development Environment

- **Allowed callback URLs**: `http://localhost:3000/authorization`
- **Allowed sign-out URLs**: `http://localhost:3000/logout`

#### Production Environment

- **Allowed callback URLs**: `https://master.dtetzynlrj82j.amplifyapp.com/authorization`
- **Allowed sign-out URLs**: `https://master.dtetzynlrj82j.amplifyapp.com/logout`

### How to Update Cognito Settings

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Select your User Pool (`us-east-1_7JEbEDNxI`)
3. Go to **App integration** tab
4. Select your App client
5. Edit **Hosted UI** settings
6. Update **Allowed callback URLs** and **Allowed sign-out URLs**
7. Save changes

## Security Notes

- **Never commit `.env.local`** to version control
- **Use different Cognito clients** for different environments if needed
- **Validate all environment variables** are set before deployment
- **Use HTTPS URLs** for production environments

## Troubleshooting

### Common Issues

1. **Invalid redirect_uri error**

   - Ensure the callback URL in your environment matches exactly what's configured in Cognito
   - Check for trailing slashes and protocol (http vs https)

2. **App not loading**

   - Verify all required environment variables are set
   - Check browser console for specific error messages

3. **OAuth flow fails**
   - Confirm Cognito domain and app client ID are correct
   - Verify OAuth is enabled in your Cognito App client settings
