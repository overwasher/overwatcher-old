# Common build stage
FROM node:14.17.5-alpine3.14 as common-build-stage

EXPOSE 3000
ENV NODE_ENV production
WORKDIR /app

#COPY package.json yarn.lock /app/
# not installing dev deps separately to save space (sacrificing cacheability =()
COPY . /app/
RUN cd /app/ \
    && yarn install --pure-lockfile --production=false \
    && yarn build \
    && yarn install --pure-lockfile --production=true \
    && yarn cache clean --all

CMD ["node", "dist/server.js"]
