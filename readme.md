This is a blog application:
  1. Front end : react
  2. Back end : node js
  3. Data base: postgres

Front end interacts with backend which in turn interacts with the database.

Functionality:
  1. can registed a user - separate API endpoint for this
  2. only users who are logged in can create a post
  3. image upload functionality provided
  4. the website to view data -> view the entire history / can select a sepcific date to see content of that day
  5. For now, it supports only a append only structure.
  6. added JWT token to invalidate users after specific time of login
  7. the user id and password have been encrypted before sending it to the backend and comparing it with the data within the database

Future tasks:
  1. Introduce tags and retrieve content based on a tag. (for instance can specify it to be youtube/music/travel)
  2. Deletion on content - have to introduce ID to it.
  3. Introducing kafka stream - as soon as a user will post content, the notifications can be sent to poeple who have subscribed.
