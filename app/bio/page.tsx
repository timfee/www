import Timeline from "./timeline"

export const metadata = {
  title: "About me",
}

export default function Page() {
  return (
    <>
      <h1 id="tim-feeley-s-bio">Tim Feeley’s Bio</h1>
      <p>
        Over the past 20 years, I’ve had the privilege of working alongside
        incredible teams, turning ambitious aspirations into tangible results,
        at companies like:
      </p>
      <Timeline />
      <p>
        After graduating from the University of Rhode Island with a B.S. in
        Computer Science and a minor in Communication Studies, I began my career
        in the Boston-area startup scene as an engineer, Product Manager, UX
        specialist, and PM leader, eventually becoming the Director of Core Site
        Experience at TripAdvisor for a few years.
      </p>
      <p>
        I made the leap to the Bay Area in 2016 and have been loving it ever
        since. I moved here for an opportunity to PM Facebook’s Design System,
        where the fruits of our labor culminated in a{" "}
        <a href="https://medium.com/designatmeta/evolving-the-facebook-news-feed-to-serve-you-better-f844a5cb903d">
          nice visual refresh
        </a>{" "}
        for the app.
      </p>
      <p>
        After that, I switched gears and lead the efforts of the Sign-in team at
        Google, looking after the experiences people use to create, access and
        manage their Google Accounts (as well as the underlying APIs that
        internal and external teams build with.)
      </p>
      <p>
        After a quick stint in Fintech at Goldman Sachs, I returned to Google to
        build out data protection infrastructure to keep customers’ personal
        data safe and secure as it moves across Google’s systems.
      </p>
      <p>
        I was impacted by Google’s 2023 reduction in force, but found my next
        role at Personio, building The People Operating System; all-in-one HR
        software for small and medium-sized companies.
      </p>
      <p>When I’m not working, you can find me:</p>
      <ul>
        <li>
          Chilling with my two hairless cats,{" "}
          <a href="https://instagram.com/booleanthebambino">Boolean</a> and{" "}
          <a href="https://instagram.com/hairlessfelix">Felix</a>
        </li>
        <li>
          Induilging a Broadway show (one of my favorites is{" "}
          <a href="https://www.mtishows.com/something-rotten/">
            Something Rotten
          </a>
          !)
        </li>
        <li>
          “Entertaining” my friends and trying{" "}
          <a href="https://www.saucemania.com.au/hot-sauce/a-complete-list-of-hot-ones-hot-sauces/">
            Hot Ones-inspired sauces
          </a>
          , despite their duly-noted protests.
        </li>
        <li>
          Trying to stay active on my Peloton, especially with Denis Morton’s{" "}
          <a href="https://www.onepeloton.com/blog/power-zone-training/">
            Power Zone rides
          </a>
          .
        </li>
      </ul>
      <p>
        I’m constantly inspired by the fast-paced, ever-changing world of tech.
        I believe in using technology to solve real-world problems and create
        products that people <em>love</em> to use.
      </p>
      <p>
        I’m always on the lookout for opportunities to learn, grow, and make a
        difference. After all, we may not have it all figured out, but together,
        we can make <em>better mistakes tomorrow</em>.
      </p>
    </>
  )
}
