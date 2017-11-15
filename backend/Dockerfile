FROM node:8.5.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN apt-get update
RUN apt-get install unzip
RUN chmod +x install-ipfs.sh
RUN source /usr/src/app/install-ipfs.sh

EXPOSE 3000
EXPOSE 50001

# defined in package.json
CMD [ "node", "server.js" ]




