FROM alpine
WORKDIR "/app"
COPY ./package.json ./index.js ./keys.js ./
RUN apk update \
    && apk add nodejs npm \
    && npm install
EXPOSE 5000
CMD ["npm", "run", "start"]