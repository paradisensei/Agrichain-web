var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());

app.post('/upload', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  var theFile = req.files.file;

  // TODO - Do something with the file

});

app.listen(port);