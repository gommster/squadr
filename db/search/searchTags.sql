select *, s.id from squadr_users s left join matches m on 
 ((s.id = m.id2 and m.id1=$18)or (s.id = m.id1 and m.id2=$18))
where not (s.id=$18) and (s.isRat = $1 and s.isChad = $2 and s.isHatchling=$3 and s.isLabs=$4 and s.isShoreline=$5 and s.isCustoms =$6 and s.isWoods =$7 and s.isInterchange =$8 and s.isFactory =$9 and s.isReserve =$10 and
s.isMoneyMaking =$11 and s.isSherpa =$12 and s.isNeedsSherpa =$13 and s.isScav =$14 and s.isQuesting =$15 and s.isCasual=$16 and s.isSerious=$17 and
 ((m.id1=s.id and m.id2=$18 and m.ismatched = false) or (m.id1 isnull and m.id2 isnull and m.ismatched  isnull))) order by s.id