update squadr_users
set isRat = $1, isChad = $2, isHatchling=$3, isLabs=$4, isShoreline=$5, isCustoms =$6, isWoods =$7 , isInterchange =$8 , isFactory =$9 , isReserve =$10 ,
isMoneyMaking =$11 , isSherpa =$12 , isNeedsSherpa =$13 , isScav =$14 , isQuesting =$15 , isCasual=$16 , isSerious=$17, photo1=$18, photo2=$19,
 photo3=$20, photo4=$21, photo5=$22, description=$23
where username=$24;

select * from squadr_users where username = $24;