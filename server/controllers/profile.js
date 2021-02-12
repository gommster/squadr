const { createDispatchHook } = require("react-redux");

module.exports = {
    getProfiles: async (req, res) => {
      let { id } = req.session.user;
      let {isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory, isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, 
        isCasual, isSerious}  = req.query;
      const db = await req.app.get('db')
      db.search.searchTags(isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory, isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, 
        isCasual, isSerious, id)
      .then(posts => res.status(200).send(posts))
      
    },
    createPost: async (req, res) => {
      const {title, img, content} = req.body;
      const {id} = req.session.user;
      const date = new Date;
      if(id) {
        const post = await req.app.get('db').post.create_post([id, title, img, content, date]);
        return res.status(200).send(post);
      }
      return res.status(403).send('FORBIDDEN!');
    },
    squadUp: async (req,res) => {
      console.log('IN SQUADUP: ',req.params.swipee, req.params.currUser, req.session)
      await req.app.get('db').search.checkMatch([req.params.swipee, req.params.currUser])
      .then(async matchCreated=>{
        console.log('THEN: ',matchCreated)
        matchCreated = matchCreated[0].count
        console.log('MATCH CREATED: ', matchCreated)
        if(matchCreated === 1){
          console.log('MATCH CREATED ALREADY; MATCHING: ', req.params.swipee, req.params.currUser, matchCreated);
           await req.app.get('db').search.match([req.params.swipee, req.params.currUser])
        }
        else {
          console.log('MATCH NOT YET CREATED: ', req.params.currUser, req.params.swipee, matchCreated)
           await req.app.get('db').search.newMatch([req.params.currUser, req.params.swipee])
        }
        return res.status(200).send(matchCreated)
      })
      }
    ,
    getProfile: (req, res) => {
      req.app.get('db').user.getProfile(req.params.id)
        .then(profile => profile[0] ? res.status(200).send(profile[0]) : res.status(200).send({}))
    },
    deletePost: (req, res) => {
      req.app.get('db').post.delete_post(req.params.id)
        .then(_ => res.sendStatus(200))
    },
    checkMatch: (req, res) => {
      req.app.get('db').user.checkMatch(req.params.id1, req.params.id2)
        .then(_=> res.sendStatus(200));
    }
  }