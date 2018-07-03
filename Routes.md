# Routes

### Welcome Route

Method | Route Address | Input Parameters | Output JSON
--- | --- | --- | ---
GET | / | None | Welcome Message

### Authentication Routes

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
