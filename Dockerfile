# To start the Docker image, build the image
# Copy your privatekey and fullchain into the ssl/ folder at the root of this project
# Then, run `sudo docker run -d -v ~/apps/gradebot/ssl:/gradebotSSLKeys:ro -p 8443:8443 yourImageName`
# To see output in the terminal, omit the `-d`


FROM node:12.13.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Telegram only communicates on a few specific ports
EXPOSE 8443

CMD [ "node", "app/bot/bot.js" ]
