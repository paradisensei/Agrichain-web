const express = require('express'),
      app = express(),
      port = process.env.PORT || 3001;

const fileUpload = require('express-fileupload');
const fs = require('fs');

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001');

import Web3 from 'web3';

// default options
app.use(fileUpload());

app.post('/upload', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  const image = req.files.file;
  console.log(image);

  const something = req.files.something;
  console.log(something);

  // save image to IPFS $ receive its hash in return
  ipfs.files.add(image.data, function(err, files) {
    if (err)
      return res.status(500).send(err);

    // TODO: put to the blockchain
    const hash = files[0].hash;
    res.send(hash);
  });
});

app.post('/upload2', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  const web3 = new Web3('https://ropsten.infura.io/k3UcFEukZlu59yyXhUQo');

  // Instantiate contract once web3 is provided.
  const contractInfo = require('./AgrichainInfo.json');
  const contract = new web3.eth.Contract(contractInfo.abi, contractInfo.address);

  // save product's info to blockchain
  const data = contract.methods.newProduct(
    req.title, req.image,
    req.latitudeBase, req.latitudeDec, req.longitudeBase, req.longitudeDec,
    req.price, req.quantity
  ).encodeABI();

  const account = web3.eth.accounts.privateKeyToAccount(req.key);
  account.signTransaction({
    to: contractInfo.address,
    gasLimit: 1000000,
    data: data
  })
    .then(({rawTransaction}) => web3.eth.sendSignedTransaction(rawTransaction))
    .then(tx => {
      res.send('Ok');
      console.log(JSON.stringify(tx));
    })
    .catch(console.log);
});


app.listen(port);