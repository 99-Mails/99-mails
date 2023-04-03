FROM node:18-alpine

# Add a work directory
WORKDIR /app

# Copy app files
COPY . /app

RUN yarn install --frozen-lockfile && \
    yarn build && \
    yarn cache clean && \
    rm -rf ./src ./cypress ./public

# Expose port
EXPOSE 5173

# Start the app
CMD ["yarn", "run", "dev"]