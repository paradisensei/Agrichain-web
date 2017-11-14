const express = require('express'),
      app = express(),
      port = process.env.PORT || 3001;

const fileUpload = require('express-fileupload');
const fs = require('fs');

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001');

// default options
app.use(fileUpload());

app.post('/upload', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  const image = req.files.file;

  // save image to IPFS $ receive its hash in return
  ipfs.files.add(image.data, function(err, files) {
    if (err)
      return res.status(500).send(err);

    const hash = files[0].hash;
    res.send(hash);
  });
});

app.listen(port);