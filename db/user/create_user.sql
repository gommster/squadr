insert into squadr_users (username, password, profile_pic, description, isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory, isInterchange, isReserve, isMoneyMaking,
               isSherpa, isNeedsSherpa, isScav, isQuesting, isCasual, isSerious, photo1, photo2, photo3, photo4, photo5)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25, $26);

select * from squadr_users where username = $1;