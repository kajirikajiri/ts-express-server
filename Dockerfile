FROM node:16-alpine
ENV APP_ROOT /app/
WORKDIR $APP_ROOT
COPY package.json $APP_ROOT
COPY yarn.lock $APP_ROOT
RUN npm i -g @nestjs/cli
RUN yarn
RUN pwd
RUN ls -la
RUN yarn build
COPY . $APP_ROOT
EXPOSE 3000
CMD ["yarn", "start:prod"]
