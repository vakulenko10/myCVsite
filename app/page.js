"use client"
import Image from "next/image";
import Container from "./components/Container";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  console.log("Session:", session)
  
  return(
    
    <main className="page pt-[100px] z-0">
      <Container className={'px-3 md:px-1'}>
        <h1>Hi there!</h1>
        {/* <p>That is admin dashboard site, you have to login to be able to edit your personal website...</p>
        <p>Login button is in the navbar. Remember you wont be able to change anything on your main website through that dashboard unless you are logged in as the admin</p>
        <p>The code here is wtitten that way, so that admin can create new database schemas, so that updating the websites items info is really eas</p>
        <p>You just dont have to dive deep into the code, you just have to create new mongoDB model. If you want that model to become the base for displayed section on your main website, you also have to update the list of main websites sections in the mainVars, and also you should update the sectionToModelMap so that each new section would have good updating functionality </p>
        <h1>It is better to log out from admin session each time you visited that page.</h1>
        <p>Also it is a lot better to have stable internet connection, doing so would give you an opportunity to make sure that everything went right while editing</p>
        <h1>Better to keep that webpage in secret</h1>
        <p>It is a lot better doing so, otherwise the risk of violating the content on main page grows really much</p>
        <h1>Always think of any action you are aiming to do</h1>
        <p>Some stuff can go wrong sometimes, but thats the demo version of that admin dashboard, so I ran that dashboard online to receive as more feedback from real user experience</p>
        <h1>Non rendering sections</h1>
        <p>It would be really cool if I added some more sections, and make some more editing possible.  </p>
        <h1>Login</h1>
        <p>You wont be able to login into dashboard, unless you are using admins gmail account in your browser</p> */}
      </Container>
    </main>
  )
  
}
