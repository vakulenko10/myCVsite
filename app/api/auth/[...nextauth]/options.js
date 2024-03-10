// import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

export const options = {
    providers:[
        // GitHubProvider({
        //     profile(profile) {
        //         //console.log("Profile GitHub: ", profile);

        //         let userRole = "user"
        //         if(profile?.email == process.env.ADMINEMAIL){
        //             userRole = "admin"
        //             return{
        //                 ...profile,
        //                 id: profile.sub,
        //                 role: userRole
        //             }
        //         }
        //         else if(profile?.email !== process.env.ADMINEMAIL){
        //             console.log("Access Denied: Only admin users allowed to sign into admin dashboard.");
        //             redirect('/')
        //         }
        //     },
        //     clientId: process.env.GitHub_ID,
        //     clientSecret: process.env.GitHub_Secret,
        // }),
        GoogleProvider({
            profile(profile) {
                //console.log("Profile Google: ", profile);

                let userRole = "Google User"
                if(profile?.email == process.env.ADMINEMAIL){
                    userRole = "admin"
                    return{
                    ...profile,
                    id: profile.sub,
                    role: userRole
                    }
                }
                else if(profile?.email !== process.env.ADMINEMAIL){
                    console.log("Access Denied: Only admin users allowed to sign into admin dashboard.");
                    return null
                }
                
            },
            clientId: process.env.Google_ID,
            clientSecret: process.env.Google_Secret,
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user) token.role = user.role;
            
            return token
        },
        async session({session, token}){
            if(session?.user) session.user.role = token.role;
            return session
        }
    }
}