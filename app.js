var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload_image', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads/Images');
  var count=0;

  fs.readdir(form.uploadDir, function(err, files) {
    if (err) return;
   
    files.forEach(function(f) {
        count++;
    }  );
    var newImageFileName = 'Model' + (count+1);

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      var ext = file.name.split('.').pop();
      fs.rename(file.path, path.join(form.uploadDir, newImageFileName+'.'+ext));
    });

    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});
  
});


app.post('/upload_model', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  modelsDir = path.join(__dirname, '/uploads/Models');
  var count=0;

  fs.readdir(modelsDir, function(err, files) {
    if (err) return;
   
    files.forEach(function(f) {
        count++;
    }  );

    var newModelFolderPath = '/Model' + (count+1);
   
    form.uploadDir = path.join(__dirname, '/uploads/Models',newModelFolderPath);
    fs.mkdir(form.uploadDir, function (err) {
      if (err) console.error(err)
    });
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      var ext = file.name.split('.').pop();
      fs.rename(file.path, path.join(form.uploadDir, 'Glasses.'+ext));
    });

    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});
  
});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
