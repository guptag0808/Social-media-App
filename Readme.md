## Social Media App

## Problem Statement
The task is to create a backend for a Social Media app that allows users to post, like and comment on posts.

### User Model
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}

## Post Model
 {
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}

### The following API routes should be developed to achieve the required functionality:

| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /api/register | This endpoint should allow users to register. Hash the password on store. | 201 |
| POST | /api/login | This endpoint should allow users to login. Return JWT token on successful login. | 201 |
| GET | /api/users | This endpoint should return a list of all registered users.  | 200 |
| GET | /api/users/:id/friends | This endpoint should return a list of all friends of a specific user identified by its ID. | 200 |
| POST | /api/users/:id/friends | This endpoint should allow the user to send a friend request to another user identified by its ID.
(Protected Route) | 201 |
| PUT / PATCH | /api/users/:id/friends/:friendId | This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID.
(Protected Route) | 204 |
| GET | /api/posts | This endpoint should return a list of all posts. | 200 |
| POST | /api/posts | This endpoint should allow the user to create a new post.
(Protected Route) | 201 |
| PUT / PATCH | /api/posts/:id | This endpoint should allow users to update the text or image of a specific post identified by its ID.
(Protected Route) | 204 |
| DELETE | /api/posts/:id | This endpoint should allow users to delete a specific post identified by its ID.
(Protected Route) | 202 |
| POST | /api/posts/:id/like | This endpoint should allow users to like a specific post identified by its ID.
(Protected Route) | 201 |
| POST | /api/posts/:id/comment | This endpoint should allow users to comment on a specific post identified by its ID.
(Protected Route) | 201 |
| GET | /api/posts/:id | This endpoint should return the details of a specific post identified by its ID. | 200 |