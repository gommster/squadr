const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const {username, password, profile_pic} = req.body;
    const db = req.app.get('db');
    const check = await db.user.find_user_by_username([username]);
    const user = check[0];
    if(user)
      return res.status(409).send('Username taken');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const registeredUser = await db.user.create_user([username, hash, `https://robohash.org/${username}.png`]);
    const newUser = registeredUser[0];
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
      password: newUser.password,
      profile_pic: newUser.profile_pic
    }
    return res.status(200).send(req.session.newUser)
  },

  login: async(req, res) => {
    const {username, password} = req.body;
    const db = req.app.get('db');

    const check = await db.user.find_user_by_username([username]);
    const user = check[0];
    if(!user)
      return res.status(401).send('username not found, please register before logging in');

    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if(!isAuthenticated)
      return res.status(409).send('Incorrect password');
    
    req.session.user = {
      id: user.id,
      username: user.username,
      password: user.password,
      profile_pic: user.profile_pic
    } 
    return res.send(req.session.user);
  },

  logout: async(req, res)=> {
    console.log('destroying')
    req.session.destroy();
    return res.sendStatus(200);
  },

  getUser: async(req, res)=> {
    if(!req.session.user)
      return res.status(404).send('no user logged in');
  
    return res.status(200).send(req.session.user);
  }
}