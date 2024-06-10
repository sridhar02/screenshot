
# Screenshot

A tool to create screenshots for any given website URL inspired from [Screenshotone](https://screenshotone.com) using puppeter for taking screenshot in browser & uploading to cloudflare R2.


## Tech Stack

**Client:** T3 Stack, Next JS, React JS, Tailwindcss, shadcn  

**Server:** TRPC, PSQL, Prisma, Puppeter 

**Deployments**: Vercel, Neon, Cloudflare


## Documentation

The project is divided into 3 parts client, screen shot api, & worker.

- Client is the frontend of the application where user facing UI is there along with server side logic to interact with db to update records.

- Screenshot-api is the puppeter service to take a screenshot in a browserless environment.

- Worker is the image upload part to which taken screenshots are uploaded R2.


## Authors

- [@sridhar02](https://github.com/sridhar02)

