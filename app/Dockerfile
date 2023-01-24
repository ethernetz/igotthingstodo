FROM node:19-alpine3.16

# Need permissions to create directories
USER node

# Create and define the node_modules's cache directory.
WORKDIR /home/node/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install

# Create and define the application's working directory.
WORKDIR /home/node/app

# Expose port 5173 for the SvelteKit app
EXPOSE 5173