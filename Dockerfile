FROM node:18.18.2-alpine3.18 as build

WORKDIR /workspace

ARG TARGET_PACKAGE

COPY ./packages/common ./common
COPY ./packages/${TARGET_PACKAGE} ./${TARGET_PACKAGE}

WORKDIR /workspace/${TARGET_PACKAGE}

RUN yarn
RUN yarn build

FROM alpine:3.18 as artifact

ARG TARGET_PACKAGE

WORKDIR /public

COPY --from=build /workspace/${TARGET_PACKAGE}/dist /public
RUN mkdir /public/docs