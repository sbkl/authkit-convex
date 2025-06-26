export async function requestSignIn(email: string) {
  return await fetch(`/api/auth/request-sign-in`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function signIn(email: string, code: string) {
  return await fetch(`/api/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}
