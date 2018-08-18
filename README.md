# Gridnet

## Introduction

> This is a social networking setup designed from scratch using node for processing, mongo for the database, middleware http handling with expressJS and the front end is designed with bootstrap in Angular 6.

## Commands

> start | Possible args : "testing", "development" (default), "production"

## Installation and Running

> npm i

> npm start

## To-do List

* Configure an SMS provider.

* Design a real-time chat setup.

* Design and Integrate front end.

## Routes

#### Authentication Routes

Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
POST | /auth/register | name, username, email, phone, passEnter, passConfirm | Success/Error Message
POST | /auth/login | username, password | Success/Error Message
GET | /auth/status | header > x-access-token | Success/Error Message
POST | /auth/verify/phone/:username | params, otp | Success/Error Message
GET | /auth/verify/email/:username/:code | params | Success/Error Message
POST | /auth/forgot | email | Success/Error Message
PATCH | /auth/reset/:id | params, password | Success/Error Message
PATCH | /auth/change-password | oldPassword, newPassword | Success/Error Message
GET | /auth/logout | header > x-access-token | Success/Error Message

#### Friend Routes

Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
GET | /actions/friend/add/:friend_id | params | Success/Error Message
GET | /actions/friend/manage/:type/:id | params | Success/Error Message

#### Newsfeed and Profile Routes

Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
GET | /actions/feed/fetch | token | Feed Posts
GET | /actions/feed/profile/:id | token | Full User Profile

#### Post Routes
Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
POST | /actions/post/add | x-access-token, content, status? | Success/Error Message
GET | /actions/post/like/:id | x-access-token | Success/Error Message
GET | /actions/post/unlike/:id | x-access-token | Success/Error Message
GET | /actions/post/dislike/:id | x-access-token | Success/Error Message
POST | /actions/post/add-comment/:id | x-access-token, content | Success/Error Message
GET | /actions/post/remove-comment/:postid/:commentid | x-access-token | Success/Error Message

## Future Extensions

> Enable the SMS feature.

> Privacy Settings for posts.

> Replies to comments.

> Group chats.

## Technical Extras

> May shift to express 5 (Rewrite in TS).

> Set Up babel and webpack for the above.

> Write autommated test cases, if required.

## Application URL

* To Be deployed
