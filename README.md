# React + Apollo Tutorial

This project loosely followed the How to GraphQL Tutorial for React + Apollo:

https://www.howtographql.com/react-apollo/0-introduction/

Significant differences are described [below](#differences-with-tutorial).

## Create React App

See generated Create React App [README][cra].

## GraphQL Server

The React Apollo tutorial instructs to use the GraphQL server built from the
Node tutorial but this project used the one from the Ruby tutorial instead.
Specifically, it used the following backend project:

https://github.com/mikong/rails-graphql-tutorial

## Differences with Tutorial

### Tailwind CSS

Instead of using the Tachyons library, we use [Tailwind][tailwind] with
PostCSS instead.

### Authentication

Since this project used a different GraphQL server from the tutorial, the login
and signup mutations are a bit different. The backend server doesn't
automatically login the user after signup so that difference is also reflected
in the frontend.

The backend server already handles sessions by storing the token in the session.
The part in the tutorial that configures Apollo with the authentication token by
using the Apollo Link middleware was no longer followed.

> Warning: This is still not a production-ready authentication feature.

### Automatic Cache Update after Vote Mutation

The tutorial has a section about manually updating the cache to make the UI
display the correct number of votes after the vote mutation was performed.
However, Apollo was automatically updating the displayed votes so passing the
`update` function prop to the `Mutation` component was not necessary.

The `CreateLink` component still needs the `update` function prop to display
newly added links so that part of the tutorial was still followed.

[cra]: https://github.com/mikong/react-apollo-tutorial/blob/master/CREATE_REACT_APP.md
[tailwind]: https://tailwindcss.com/
