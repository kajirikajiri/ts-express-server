FROM node:16-alpine
ENV APP_ROOT /app/
WORKDIR $APP_ROOT
COPY package.json $APP_ROOT
COPY yarn.lock $APP_ROOT
COPY tsconfig.build.json $APP_ROOT
RUN yarn && yarn build
COPY . $APP_ROOT
EXPOSE 3000
CMD ["yarn", "start:prod"]
