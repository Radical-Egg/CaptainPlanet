FROM node:latest

WORKDIR /usr/app
RUN mkdir -p /etc/pki/X509

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

CMD ["node", "start"]