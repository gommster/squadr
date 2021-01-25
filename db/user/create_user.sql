insert into helo_users (username, password, profile_pic) 
  values ($1, $2, $3);

select * from helo_users where username = $1;