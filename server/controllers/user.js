const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const {username, password, isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory,
      isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, isCasual, isSerious, 
      description, photo1, photo2, photo3, photo4, photo5} = req.body;
    console.log('BODY: ', req.body)
    const db = req.app.get('db');
    const check = await db.user.find_user_by_username([username]);
    console.log('CHECK: ', check)
    const user = check[0];
    if(user)
      return res.status(409).send('Username taken');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const registeredUser = await db.user.create_user([username, hash, 'https://squadr-main.s3-us-west-2.amazonaws.com/6e11d6c1-2d2e-4428-869e-d3b5ea939941-profile.png', description, isRat, isChad, isHatchling, isLabs, 
    isShoreline, isCustoms, isWoods, isFactory, isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, isCasual, isSerious, 
    photo1, photo2, photo3, photo4, photo5]);
    const newUser = registeredUser[0];
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      profile_pic: newUser.profile_pic,
      description: newUser.description,
      isRat: newUser.isRat, isChad: newUser.isChad, isHatchling: newUser.isHatchling, isLabs: newUser.isLabs, 
      isShoreline: newUser.isShoreline, isCustoms: newUser.isCustoms, isWoods: newUser.isWoods, isFactory: newUser.isFactory,
      isInterchange: newUser.isInterchange, isReserve: newUser.isReserve, isMoneyMaking: newUser.isMoneyMaking, isSherpa: newUser.isSherpa,
      isNeedsSherpa: newUser.isNeedsSherpa, isScav: newUser.isScav, isQuesting: newUser.isQuesting, isCasual: newUser.isCasual, 
      isSerious: newUser.isSerious,
      photo1: newUser.photo1,
      photo2: newUser.photo2,
      photo3: newUser.photo3,
      photo4: newUser.photo4,
      photo5: newUser.photo5
    }
    return res.status(200).send(req.session.newUser)
  },

  saveProfile: async (req, res) => {
    const {username, profile_pic, isRat, isChad, isHatchling, isLabs, isShoreline, isCustoms, isWoods, isFactory,
      isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, isCasual, isSerious, 
      description, photo1, photo2, photo3, photo4, photo5} = req.body;
    console.log('BODY: ', req.body)
    const db = req.app.get('db');

    const registeredUser = await db.user.save_user([isRat, isChad, isHatchling, isLabs, 
    isShoreline, isCustoms, isWoods, isFactory, isInterchange, isReserve, isMoneyMaking, isSherpa, isNeedsSherpa, isScav, isQuesting, isCasual, isSerious, 
    photo1, photo2, photo3, photo4, photo5, description, username]);
    const newUser = registeredUser[0];
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      profile_pic: newUser.profile_pic,
      description: newUser.description,
      isRat: newUser.isRat, isChad: newUser.isChad, isHatchling: newUser.isHatchling, isLabs: newUser.isLabs, 
      isShoreline: newUser.isShoreline, isCustoms: newUser.isCustoms, isWoods: newUser.isWoods, isFactory: newUser.isFactory,
      isInterchange: newUser.isInterchange, isReserve: newUser.isReserve, isMoneyMaking: newUser.isMoneyMaking, isSherpa: newUser.isSherpa,
      isNeedsSherpa: newUser.isNeedsSherpa, isScav: newUser.isScav, isQuesting: newUser.isQuesting, isCasual: newUser.isCasual, 
      isSerious: newUser.isSerious,
      photo1: newUser.photo1,
      photo2: newUser.photo2,
      photo3: newUser.photo3,
      photo4: newUser.photo4,
      photo5: newUser.photo5
    }
    return res.status(200).send(req.session.newUser)
  },

  login: async(req, res) => {
    const { username, password} = req.body;
    const db = req.app.get('db');
    const check = await db.user.find_user_by_username([username]);
    const user = check[0];
    if(!user)
      return res.status(401).send('username not found, please register before logging in');

    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if(!isAuthenticated)
      return res.status(409).send('Incorrect password');
    
      console.log('logging in: ', user)
    req.session.user = {
      id: user.id,
      username: user.username,
      password: user.password,
      profile_pic: user.profile_pic
    }
    return res.send(req.session.user);
  },

  logout: async(req, res)=> {
    req.session.destroy();
    return res.sendStatus(200);
  },

  getUser: async(req, res)=> {
    if(!req.session.user)
      return res.status(404).send('no user logged in');
  
    return res.status(200).send(req.session.user);
  }
}