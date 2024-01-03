import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions: any = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: { params: { scope: "openid email" } },
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "online",
            //         response_type: "code",
            //         // scope: "openid email profile"
            //         // redirect_uri: "https://www.dotpointcapital.com/api/auth/callback/google",
            //     }
            // }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        })
        // Add other providers if needed
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: any) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
            // if (account.provider === "google") {
            //     return profile.email_verified
            //     // return profile.email_verified && profile.email.endsWith("@example.com")
            // }
            // return true // Do different verification for other providers that don't have `email_verified`
        },
        async session({ session, token }: any) {
            // Include the account object in the session data
            if (token.account) {
                session.user = token.user;
                session.account = token.account;
                session.profile = token.profile;
                session.isNewUser = token.isNewUser;
            }
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser, trigger, session }: any) {
            // Modify the token object if needed
            if (account) {
                token.user = user;
                token.account = account;
                token.profile = profile;
                token.isNewUser = isNewUser;
            }
            return token;
        },
        // authorized({ req, token }: any) {
        //     if (token) return true // If there is a token, the user is authenticated
        // },
        // async redirect({ url, baseUrl }: any) {
        //     console.log(baseUrl, "baseUrl")
        //     // Allows relative callback URLs
        //     if (url.startsWith("/")) return `${baseUrl}${url}`
        //     // Allows callback URLs on the same origin
        //     else if (new URL(url).origin === baseUrl) return url
        //     console.log(`${baseUrl}${url}`, "baseUrlAfter")
        //     return baseUrl
        // },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)