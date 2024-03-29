var express = require('express'); // ExperssJS Framework
var app = express(); var port = process.env.PORT || 8080; // Set default port or assign a port in enviornment
var morgan = require('morgan'); 
var mongoose = require('mongoose');   
var bodyParser = require('body-parser'); // Node.js body parsing middleware
var router = express.Router(); // Invoke the Express Router
var appRoutes = require('./app/routes/api')(router); // Importing the API
var path = require('path');

app.use(morgan('dev')); // Morgan Middleware
app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public')); // Sitting to access public folder 
app.use('/api', appRoutes); 

//to overcome mongodb warnings and depreciations 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


//connection to DB
mongoose.connect('mongodb+srv://lataco:latacofullstack@lataco.ebiv5.mongodb.net/lataco?retryWrites=true&w=majority' || 'mongodb://localhost:27017/foodCart', {useNewUrlParser: true},function(err)
{
  //throw error if not connected to db
  if(err)
  {
    console.log('Not connected to the database '+ err);
  }
  else
  {
    console.log('Successfully connected to MongoDB');
  }
});

// Set Application Static Layout
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});

// Start Server
app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port
});
