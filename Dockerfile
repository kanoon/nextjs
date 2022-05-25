FROM node:lts as dependencies
WORKDIR /api-test
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /api-test
COPY . .
COPY --from=dependencies /api-test/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /api-test
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /api-test/next.config.js ./
COPY --from=builder /api-test/public ./public
COPY --from=builder /api-test/.next ./.next
COPY --from=builder /api-test/node_modules ./node_modules
COPY --from=builder /api-test/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]