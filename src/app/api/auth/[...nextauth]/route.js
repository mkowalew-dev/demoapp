import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import OktaProvider from "next-auth/providers/okta";

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    OktaProvider({
      clientId: process.env.OKTA_OAUTH2_CLIENT_ID,
      clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET,
      issuer: process.env.OKTA_OAUTH2_ISSUER,
  }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Add your own authentication logic here
        if (credentials.username === 'presales' && credentials.password === 'demo123') {
          // Return user object if credentials are valid
          return Promise.resolve({ id: 1, name: 'Presales', email: 'se@company.com', image: '/images/profile/user-1.jpg' });
        } else if(credentials.username === 'product' && credentials.password === 'demo123') {
          // Return user object if credentials are valid
          return Promise.resolve({ id: 2, name: 'Product', email: 'pm@company.com', image: '/images/profile/user-9.jpg' });
        } else if(credentials.username === 'csm' && credentials.password === 'demo123') {
          // Return user object if credentials are valid
          return Promise.resolve({ id: 3, name: 'CSM', email: 'csm@company.com', image: '/images/profile/user-8.jpg' });
        } else if(credentials.username === 'sales' && credentials.password === 'demo123'){
          // Return user object if credentials are valid
          return Promise.resolve({ id: 4, name: 'Sales', email: 'ae@company.com', image: '/images/profile/user-7.jpg' });
        } else {
            // Return null if credentials are invalid
            return Promise.resolve(null);
          }

      },
    }),
  ],
});
export { handler as GET, handler as POST };
