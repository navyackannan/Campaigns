const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var cors = require('cors')
app.use(bodyParser.json());

const accessTokenSecret = 'justanassignment';

app.listen(4000, () => {
    console.log('Rest service started on port 4000');
});
app.use(cors())
const users = [
    {
        username: 'navyackannan@gmail.com',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna@gmail.com',
        password: 'password123member',
        role: 'member'
    }
];

app.post('/login', (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

const campaigns = [
    {
	  id :1,
      name:"UA Sports Singapore..",
	  cmstatus:"Published",
	  duration:"01 Apr- 31 Apr 2019",
	  locationCm:"Maharashtra",
      deadline:"View Report",
      imageUrl :'/../assets/images/uasports.jpg'
    },
	{
	  id :2,
      name:"Nespresso",
	  cmstatus:"Processing",
	  duration:"28 May- 20 Jun 2019",
	  locationCm:"Delhi",
      deadline:"Avalable in 2 Days",
      imageUrl :'/../assets/images/nespresso.jpg'
    },
	{
	  id :3,
      name:"DBS-3 BillBoards",
	  cmstatus:"Published",
	  duration:"10 jun- 30 Jun 2019",
	  locationCm:"Maharashtra",
     deadline:"Avalable in 4 Days",
     imageUrl :'/../assets/images/images3.jpg'
    },
	{
	  id :4,
      name:"Test Campaign",
	  cmstatus:"Ongoing",
	  duration:"01 Apr- 31 Apr 2019",
	  locationCm:"Maharashtra",
     deadline:"Avalable in 6 Days",
     imageUrl :'/../assets/images/image4.jpg'
    },
	{
	  id :5,
      name:"Focus Media 1",
	  cmstatus:"Published",
	  duration:"01 Apr- 31 Apr 2019",
	  locationCm:"Maharashtra",
     deadline:"Avalable in 23 Days",
     imageUrl :'/../assets/images/image4.jpg'
    },
	{
	  id :6,
      name:"UA Sports Singapore2..",
	  cmstatus:"Archived",
	  duration:"01 Aug- 30 Aug 2019",
	  locationCm:"Maharashtra",
     deadline:"Avalable in 25 Days",
     imageUrl :'/../assets/images/image4.jpg'
    },
    {
        id :7,
        name:"Test Campaign 3",
        cmstatus:"Ongoing",
        duration:"01 Apr- 31 Apr 2019",
        locationCm:"Maharashtra",
       deadline:"Avalable in 6 Days",
       imageUrl :'/../assets/images/image4.jpg'
      },
      {
        id :8,
        name:"Focus Media 3",
        cmstatus:"Published",
        duration:"01 Apr- 31 Apr 2019",
        locationCm:"Maharashtra",
       deadline:"Avalable in 23 Days",
       imageUrl :'/../assets/images/images3.jpg'
      },
      {
        id :9,
        name:"UA Sports Singapore2..",
        cmstatus:"Archived",
        duration:"01 Aug- 30 Aug 2019",
        locationCm:"Delhi",
       deadline:"Avalable in 25 Days",
       imageUrl :'/../assets/images/image4.jpg'
      },
      {
        id :10,
        name:"Test Campaign5",
        cmstatus:"Ongoing",
        duration:"01 Apr- 31 Apr 2019",
        locationCm:"Kerala",
       deadline:"Avalable in 6 Days",
       imageUrl :'/../assets/images/image4.jpg'
      },
      {
        id :11,
        name:"Focus Media5",
        cmstatus:"Published",
        duration:"01 Apr- 31 Apr 2019",
        locationCm:"Kerala",
       deadline:"Avalable in 23 Days",
       imageUrl :'/../assets/images/image4.jpg'
      },
      {
        id :12,
        name:"UA Sports Singapore2..",
        cmstatus:"Archived",
        duration:"01 Aug- 30 Aug 2019",
        locationCm:"Maharashtra",
       deadline:"Avalable in 25 Days",
       imageUrl :'/../assets/images/image4.jpg'
      },
	
];

app.get('/campaigns', (req, res) => {
    res.json(campaigns);
});