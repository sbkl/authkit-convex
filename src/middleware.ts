import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

// Match against the pages
export const config = {
  matcher: ["/", "/auth", "/account/:path*", "/api/:path*"],
};
