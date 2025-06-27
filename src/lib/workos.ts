export async function requestSignIn(args: { email: string }) {
  return await fetch(`/api/auth/otp/request-sign-in`, {
    method: "POST",
    body: JSON.stringify(args),
  });
}

export async function signIn(args: { email: string; code: string }) {
  return await fetch(`/api/auth/otp/sign-in`, {
    method: "POST",
    body: JSON.stringify(args),
  });
}
