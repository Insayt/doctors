FROM node:14-alpine

WORKDIR /opt/renhealth-web

COPY ./source/.env.docker ./.env
COPY ./source ./
COPY ./helm-chart/Chart.yaml ./Chart.yaml

RUN npm install

RUN npm run build
#RUN npm prune --production

CMD [ "node", "server/index.js" ]

#docker build -t node-docker-rhweb .
#docker run --rm -it --name rhweb -p 80:3000 node-docker-rhweb
#docker run --rm -it --name rhweb --pid=host -p 80:3000 node-docker-rhweb
