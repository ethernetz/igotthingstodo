FROM node:16-alpine3.16

# Firebase emulators need java to run 
RUN apk add openjdk11

# Need permissions to create directories
USER node

# In order to install global dependencies, put dependencies in non-root user path 
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#global-npm-dependencies
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g firebase-tools@latest

# Create and define the functions' node_modules cache directory
WORKDIR /home/node/functions-cache

# Install functions' node_modules into the functions-cache directory
COPY --chown=node:node ./functions/package.json ./functions/package-lock.json* ./
RUN npm install

# Create and define the application's working directory
WORKDIR /home/node/app

# Add functions' node_modules to path so we can run packages
ENV PATH /home/node/app/functions/node_modules/.bin:$PATH