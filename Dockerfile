FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app
RUN yarn install --production
COPY ./ /app
RUN yarn build

FROM nginx:1.16.1-alpine
COPY --from=builder /app/build /home/Desktop/myBlog/admin
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
