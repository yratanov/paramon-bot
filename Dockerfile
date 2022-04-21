FROM node:14.17.5

RUN mkdir -p /usr/api
COPY . /usr/api
WORKDIR /usr/api
RUN apt-get update
RUN apt-get -y install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
RUN npm install --production

ENV PORT 8080
EXPOSE  $PORT

CMD ["npm", "start"]
