# AuthKit-Convex example

This is an example repo to setup AuthKit with convex within a nextjs project using MagicAuth OTP via email. Feeback welcome.

1- Install dependencies

```bash
pnpm i
```

2- Insert your WORKOS_API_KEY and WORKOS_CLIENT_ID from your workos dashboard in both nextjs .env.local and convex dashboard

3- While you are in your workos dashboard, go to Authentication > Sessions and make sure to add the audience claim to the same value than the applicationID in your auth.config.ts in your convex folder.

```json
{
  // This is mandatory for convex integration to work
  "aud": "convex",
  // Additonal fields your would like to add to JWT token
  "name": "{{ user.first_name }} {{ user.last_name }}",
  "email": {{user.email}},
  "picture": {{user.profile_picture_url}},
  "given_name": {{user.first_name}},
  "updated_at": {{user.updated_at}},
  "family_name": {{user.last_name}},
  "email_verified": {{user.email_verified}}
}
```

4- Create a WORKOS_COOKIE_PASSWORD key and add it to your .env.local file

Below command in your terminal to generate such a key

```bash
openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 32
```

5- Workos Webhooks
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

Once the webhook created, make sure to copy the Signing Secret and set it up as an environment variable in the convex dashboard with the name `WORKOS_WEBHOOK_USERS_SECRET`.

6- Emails

This example uses Resend to send custom emails instead of workos emails. Make sure to disable workos email in their dashboard if you do so. Otherwise just ignore it.

7- Run convex

This will ask you to login and setup a new convex project which will set the CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL environment variables in your .env.local

```bash
npx convex dev
```

8- Run nextjs

```bash
pnpm dev
```
