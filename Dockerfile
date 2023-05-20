FROM node:alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

ENV accountSid=AC92293dcda3bc076860b99e1b1ef7e7d0 \
    authToken=6b4300dd3e1ba974ff5effa80be5fdc4 \
    PORT=3000 \
    URI=mongodb+srv://hru:bhosale@cluster1.rgvgv2s.mongodb.net/project?retryWrites=true&w=majority \
    # URI=mongodb://localhost:27017
    ACCESS_TOKEN=king \
    CLOUDINARY_CLOUD_NAME=dbp4j9qjh \
    CLOUDINARY_KEY=451351244792659 \
    CLOUDINARY_SECRET=2GxCJAYzQzo794V_Xpn22y5ovvM

RUN npm install
EXPOSE 3000
CMD ["npm","start"]
