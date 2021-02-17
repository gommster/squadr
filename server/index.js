require('dotenv').config();
const express = require('express'),
      userCtrl = require('./controllers/user'),
      profileCtrl = require('./controllers/profile'),
      massive = require('massive'),
      session = require('express-session'),
      path = require('path'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;
      aws = require('aws-sdk');

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {maxAge: 500000000},
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db=>{
  app.set('db', db);
  console.log('db connected');
})

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);
app.put('/api/auth/saveProfile', userCtrl.saveProfile)

//user Endpoints
app.get('/api/profile/all', profileCtrl.getProfiles);
app.get('/api/profile/:id', profileCtrl.getProfile);
app.put('/api/profile/squadUp/:swipee&:currUser', profileCtrl.squadUp);

app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-west-2',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log('')
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});

app.use(express.static(__dirname + '/../build'));
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, _ => console.log(`running on ${SERVER_PORT}`));