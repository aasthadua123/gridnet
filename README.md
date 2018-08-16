# Gridnet

## Introduction

> This is a social networking framework designed from the ground-up using node, mongo and the front end is designed in Angular 6.

## How To

> Allowed values for Cross Origin - List / All.

> Set up a database.

## Commands

> start -> Start the server in development mode. Args can be testing and production.

## Installation and Running

> npm i

> npm start

## To-do List

* Set Up Feed system for NewsFeed and Profile.

* Set up Email and SMS Logistics.

* Set up Change Data APIs.

* Set up Link Systems

* Set up Post Logging

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
GET | /actions/friend/manage/:type/:id | params | Success/Error Message

## Application URL

* To Be deployed
