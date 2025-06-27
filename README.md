# AuthKit-Convex example

This is an example repo to setup AuthKit with convex within a nextjs project using MagicAuth OTP via email, google as an example for the oauth flow and SSO.

> For SSO, the domain check to find the right organizationId happens within convex so you need to make sure the organisation you test against exist within convex with the right organisationDomain of the user email you want to test.

Single auth form that creates the user if it doens't exist and continue the auth flow.

Feeback welcome.

1- Clone repo

```bash
git clone git@github.com:sbkl/authkit-convex.git && cd authkit-convex
```

2- Install dependencies

```bash
pnpm i
```

3- Set the .env.local file

```bash
cp .example.env.local .env.local
```

4- Run convex

This will ask you to login and setup a new convex project which will set the `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` environment variables in your `.env.local`:

```bash
npx convex dev
```

> While the project provisioning, schema validation and table creation will go through, the deployment will fail because you will miss the mandatory environment variables specified under /convex/env.ts. We will fix that below.

5- Insert your `WORKOS_API_KEY` and `WORKOS_CLIENT_ID` from your workos dashboard in **both** nextjs `.env.local` and in the convex dashboard of your new project you can find under `Settings > Environment Variables`

6- While you are in your workos dashboard, go to `Authentication > Sessions` and make sure to add the audience claim ("aud") to the same value than the `applicationID` in your `auth.config.ts` in your convex folder.

```
{
  "aud": "convex",
  "name": "{{ user.first_name }} {{ user.last_name }}",
  "email": {{user.email}},
  "picture": {{user.profile_picture_url}},
  "given_name": {{user.first_name}},
  "updated_at": {{user.updated_at}},
  "family_name": {{user.last_name}},
  "email_verified": {{user.email_verified}}
}
```

7- Create a WORKOS_COOKIE_PASSWORD key and add it to your .env.local file

Below command in your terminal to generate such a key

```bash
openssl rand -base64 32
```

8- Workos Webhooks for users

Sync your convex database with workos webhooks for the `users` table. In your workos dashboard, under the Developer section in the sidebar, go to webhooks and create a new webhook.

Endpoint:

`https://<your-convex-slug>.convex.site` is your convex http action url.

`/workos-webhooks/users` is the endpoint set in the example listening for the event listed below:

Full endpoint:

```
https://<your-convex-slug>.convex.site/workos-webhooks/users
```

Replace `<your-convex-slug>` with your actual convex slug.

Events to listen for:

- user.created
- user.updated
- user.deleted
- authentication.magic_auth_succeeded
- authentication.oauth_succeeded

9- Workos Webhooks for organisations if you use SSO

Sync your convex database with workos webhooks for the `organisations` and `organisationDomains` tables. Make sure to enable SSO under `Authentication` in your workos dashboard. Then, under the Developer section in the sidebar, go to webhooks and create a new webhook.

Full endpoint:

```
https://<your-convex-slug>.convex.site/workos-webhooks/organisations
```

Replace `<your-convex-slug>` with your actual convex slug.

Events to listen for:

- organization.created
- organization.updated
- organization.deleted
- organization_domain.verified
- organization_domain.verification_failed

Once the webhook is created, make sure to copy the Signing Secret and set it up as an environment variable in the convex dashboard with the name `WORKOS_WEBHOOK_ORGANISATIONS_SECRET`.

From now, the deployment to convex should be successful as all mandatory environment variables are set.

9- Emails

This example uses Resend to send custom emails instead of workos emails. Make sure to disable workos email in their dashboard if you do so. Otherwise just ignore it.

10- Run nextjs

```bash
pnpm dev
```
