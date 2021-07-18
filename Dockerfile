FROM node:16-alpine
ENV APP_ROOT /app/
WORKDIR $APP_ROOT
COPY package.json $APP_ROOT
COPY yarn.lock $APP_ROOT
RUN yarn
COPY . $APP_ROOT
EXPOSE 3000
CMD ["yarn", "dev" ]
