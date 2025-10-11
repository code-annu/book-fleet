-> Readme before proceed

# Authentication

SignUp -> {
path:"/api/v1/auth/signup",
body:[email,password],
method:post,
}

Login -> {
path:"/api/v1/auth/login",
body:[email,password],
method:post,
}

Refresh Token -> {
path:"/api/v1/auth/refresh-token",
body:[refresh_token],
method:post,
}

# User Profile Handling

Create Profile -> {
path:"/api/v1/profile",
authorization:Bearer [access_token],
body:[first_name,last_name,role,address,profile_picture_url],
method:post,
}

Update Profile -> {
path:"/api/v1/profile",
authorization:Bearer [access_token],
body:[first_name,last_name,role,address,profile_picture_url] // Provide only updating fields,
method:patch,
}

Get Profile -> {
path:"/api/v1/profile",
authorization:Bearer [access_token],
method:get,
}

Delete Profile -> {
path:"/api/v1/profile",
authorization:Bearer [access_token],
method:delete,
}

# Book sales handling

Create Book sale -> {
path:"/api/v1/book-sale",
authorization:Bearer [access_token],
body:[title,price,thumbnail_url,pickup_address,description,book_condition,sold_out],
method:post,
}

Update Book sale -> {
path:"/api/v1/book-sale/:uid",
authorization:Bearer [access_token],
body:[title,price,thumbnail_url,pickup_address,description,book_condition,sold_out] // Provide only updating fields,
method:patch,
}

Get Book sale -> {
path:"/api/v1/book-sale/:uid",
authorization:Bearer [access_token],
method:get,
}

Delete Book sale -> {
path:"/api/v1/book-sale/:uid",
authorization:Bearer [access_token],
method:delete,
}
