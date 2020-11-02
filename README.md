# [Tandem Trivia](https://trivia.briefs.link) App Frontend

- [Live Demo](https://trivia.briefs.link)
- [Backend Code](https://github.com/benjaminykim/trivia-backend)

This application is built with React and React Bootstrap.

## Dependencies

Install `npm` (6.14.6) and `yarn` (1.22.4).

## Deployment

In the project directory, you can run the app in the development mode using:

`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To deploy to firebase, build the app for production using

`yarn build`

and then deploy to the designated firebase repository with

`firebase deploy`


## DNS Configuration

The application is hosted on Firebase behind an IPv4 address. The domain 'briefs.link' was purchased on NameCheap and uses Cloudflare's nameservers.
There are A NAME records pointing 'trivia.briefs.link' to the Firebase website and pointing 'dev.briefs.link' to the backend REST API hosted on AWS EC2.

Cloudflare enabled TLS security for both the frontend and the backend. Cloudflare security certificates are served on the backend using NGINX.

## Technical Considerations

with time permitting, some nice to haves:
- testing for React frontend
- redux to simplify state management and for feature scalability
- a cleaner state solution in the Trivia.js file
- transition animations between questions
- CI/CD with testing
- Code Coverage
- multiple CSS files instead of one monolith