create table squadr_users
(id serial primary key,
username varchar not null,
password varchar not null,
description varchar(500),
isRat boolean, isChad boolean, isHatchling boolean, isLabs boolean, isShoreline boolean, isCustoms boolean, isWoods boolean, isInterchange boolean, isFactory boolean, isReserve boolean,
isMoneyMaking boolean, isSherpa boolean, isNeedsSherpa boolean, isScav boolean, isQuesting boolean, isCasual boolean, isSerious boolean,
profile_pic text,
photo1 text,
photo2 text,
photo3 text,
photo4 text,
photo5 text);

create table matches
(id serial primary key,
  id1 int,
  foreign key (id1) references squadr_users(id),
  id2 int, 
  foreign key (id2) references squadr_users(id),
  isMatched boolean)