var express = require('express'),
    app = express(),
    port = process.env.PORT || 3001;

const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    let sampleFile = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    var _path = `uploads/${parseInt(Math.random() * 10000)}_${sampleFile.name}`;
    sampleFile.mv(_path, function(err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

app.listen(port);