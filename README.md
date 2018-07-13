# Gridnet

## Introduction

> This is a social networking framework designed from the ground-up using node, mongo and the front end is designed in ReactJS.

## How To

> Allowed values for Cross Origin - List / All.

> Set up a database.

## Commands

> setup -> Generate the config file. (broken)

> start -> Start the server in development mode. Args can be testing and production.

## Installation and Running

> npm i

> npm run setup

> npm start

## Build Information

> Status: Alpha 5.0.1

## To-do List

* Set up Email and SMS Logistics.

* Set up forgot password.

* Set up oAuth APIs

* Set up Change Data APIs.

* Set up Link Systems

* Set up friend system

* Set up Post Logging

## Changelog

### Alpha 5.0.1

> Added the "Add Friend Module".

### Alpha 5

> Finalized models

> Integrated Changelog and README.

> Set up routes for everything.

### Alpha 4i

> Set up Installation Script for dummy config generation.

### Alpha 4

> Completed local authentication APIs.

> Time Logging for user's login and logout.

> change password, forgot password, reset with link.

### Alpha 3

> Server code rewrite for environment setup.

> App.js code Rewrite for environment setup.

> Concise Config.js Build.

> Selective Cross Origin Script.

> Disabled routes.

### Alpha 2

> Optimizations for Login .

> Set up Protect page code.

> Set up To do for oauth.

> Set up Change Password but needs to be fixed.

### Alpha 1

> Created verification routes and login route APIs.

> Set up dynamic routes for verification

> Alpha bug fixes.

### Registration Setup

> Created the Registration API.

> Created the Rand Generation Module.

> Set up for Email Sender Module using Nodemailer.

### Model Setup

> Add models for user, profile, posts, requests

> Setup Routing for APIs.

> Setup Server.

### Initial Setup

> Setup License.

> Setup Readme.

> Initialize Project.

## Routes

#### Welcome Route

Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
GET | / | None | Welcome Message

#### Authentication Routes

Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
POST | /auth/register | username, email, phone, passEnter, passConfirm | Success/Error Message
POST | /auth/login | username, password | Success/Error Message
GET | /auth/status | header > x-access-token | Success/Error Message
POST | /auth/verify/:type/:username | params, otp | Success/Error Message
GET | /auth/verify/:type/:username/:code | params | Success/Error Message
POST | /auth/forgot | email | Success/Error Message
PATCH | /auth/reset/:id | params, password | Success/Error Message
PATCH | /auth/change-password | oldPassword, newPassword | Success/Error Message
GET | /auth/logout | header > x-access-token | Success/Error Message

#### Friend Routes

Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
GET | /actions/friend/add/:friend_id | params | Success/Error Message

## Application URL

* To Be deployed
