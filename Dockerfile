FROM node:21.0.0

WORKDIR /usr/scr/app

COPY ["package.json","package-lock.json","./"]

RUN npm install 

COPY . .

CMD ["npm", "start"]