import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'


export default function Home() {
  return (
      <div>
        <h2>Hii My Name Is Asutosh Sidhya</h2>
          <SignedOut>
              <SignInButton />
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>
      </div>
  );
}
