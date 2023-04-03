FROM node:18-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn install --production --pure-lockfile && \
    yarn build && \
    yarn cache clean && \
    rm -rf ./src ./cypress ./public

# Copy app files
COPY . /app

# Expose port
EXPOSE 5173

# Start the app
CMD ["yarn", "run", "dev"]