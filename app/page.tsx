import Selfie from "./selfie"

export const metadata = {
  title: "Tim Feeley — Product manager. Friend.",
}

export default function Page() {
  return (
    <>
      <Selfie style={{ "--animate-in": 0 }} width="150" className="pt-4" />
      <h1 style={{ "--animate-in": 1 }}>Hi friend, I’m Tim Feeley!</h1>
      <h2 style={{ "--animate-in": 2 }}>I believe in technology</h2>
      <p style={{ "--animate-in": 3 }}>
        And its potential to amplify what humans are capable of accomplishing.
        It makes the world a little smaller—and our place in it a little larger.
      </p>
      <h2 style={{ "--animate-in": 4 }}>I believe in people</h2>
      <p style={{ "--animate-in": 5 }}>
        Each app and every device we use is created by people, for people. Not
        merely users, but humans of all backgrounds, abilities and dreams.
      </p>
      <h2 style={{ "--animate-in": 6 }}>I believe in you</h2>
      <p style={{ "--animate-in": 7 }}>
        Nobody’s perfect. But together, we can make better mistakes tomorrow.
      </p>
    </>
  )
}

declare module "react" {
  interface CSSProperties {
    "--animate-in"?: number
  }
}
