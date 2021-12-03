FROM mongo-express

RUN apk add --no-cache bash tini

EXPOSE 8000

WORKDIR /usr/app

COPY . .
RUN npm install
CMD ["npm","start"]d