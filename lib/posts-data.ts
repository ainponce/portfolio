export interface Post {
  slug: string
  title: string
  date: string
  description: string
  order: number
  content: string
}

export const posts: Post[] = [
  {
    slug: "the-way-of-the-ronin",
    title: "The Way of The Ronin",
    date: "2025-01-01",
    description: "An atypical 'about me'",
    order: 1,
    content: `In this short piece, I want to share how I started on this path of hard work and creation. I'm writing this from a place of deep appreciation, and I hope you enjoy reading it as much as I enjoyed writing it.

I don't come from a wealthy or politically connected family. Most of my relatives have always worked as employees, following orders to put food on the table and maintain a false sense of stability. That mindset never sat right with me. Whether it's innate or learned, I've always had a tendency to question authority.

That same temperament often landed me in turbulent situations that I probably could have avoided. Between my age, lack of experience, and a hunger to "take on the world," I didn't know how to pick my battles so I fought them all. That approach brought me to where I am today. I may not be in the perfect spot, but I'm certainly not in a bad one, and I'm proud to have kept my identity intact.

Being independent doesn't mean I can't be a team player or follow a leader. On the contrary, I thrive in team dynamics where open dialogue invites reflection and mutual learning. Whether with peers or former bosses, I believe that when we leave our egos at the door, we all have something to learn.

In 2025, I decided to use social media, specifically X, to connect with the Argentine tech community. To my surprise, the builder, startup, and tech ecosystem is massive, filled with incredible people and projects. Connecting with them was one of the best decisions of my life (right up there with starting BJJ). Soaking up other people's experiences has helped me grow immensely, and I hope they've learned something from me, too.

I participated in many hackathons, and to no one's surprise, I didn't win or even place in any of them. But failure never discouraged me, it fueled my drive to improve personally and professionally. It felt like doors would shut just as I approached them, but I didn't mind. I just ended up forcing them open.

The future looks promising. Big things are coming, and I'll be as ready as I can be. I hope this gives you a better sense of who I am. Writing this certainly helped me realize exactly where I stand and where I'm headed.

*News soon.*

– Ain Moises Ponce`,
  },
  {
    slug: "2025-ends-the-path-begins",
    title: "2025 Ends. The Path Begins.",
    date: "2025-12-26",
    description: "Let's start together",
    order: 2,
    content: `Taking stock of 2025, it really was a wild ride in every sense.

I started the year off well, but personally, a lot of things didn't work out... it was quite sad, honestly, but it really helped me get to know myself better. I quit my stable job where I was settled and well positioned because, as I heard in a podcast, those were just 'golden handcuffs.' I had two months to find something else before I'd have to start going into debt. The first month, I found a role at a company in Entre Rios, but it didn't go well. I didn't connect with the project a decision out of my hands but understandable and we parted ways.

I started BJJ (Brazilian Jiu-Jitsu), which became a fundamental pillar this year and for the rest of my life. It's too hard to explain what I feel every time I step onto the mat: I greet all my teammates, we spend two hours learning and trying to strangle each other, and we finish by shaking hands and thanking each other for the class.

For that job, I bought my first really solid laptop to make sure I was up to the task, so I ended up in more debt and without stable income. I started taking on freelance work, which, luckily, allowed me to survive.

I started going to events, hackathons, and meetups, and I met a lot of cracked people seriously talented (shout out to @gonzamartinese). They really motivated me to improve every day, to stay involved, and to take social media a bit more seriously. I have 50k tweets, so I definitely wouldn't survive someone digging through my past, but oh well, the past is part of who we are.

I found work again in August at a company a really cool place with some people I knew. I lasted five months until there was a staff restructuring and I got caught in the layoffs. Unemployed again.

I'm wrapping up December and this year with a project I'm super hyped to start: @dilicheck_ai, with a great team and a lot of drive to keep creating.

2025 was a great year. It allowed me to get to know myself, improve, learn, and above all, meet many people who are on the same wavelength as me or at least trying to be.

I have a lot of faith in 2026. I'm going to do everything possible to achieve all the goals I've set for myself.

– Ain Moises Ponce`,
  },
]

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => a.order - b.order)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug)
}
