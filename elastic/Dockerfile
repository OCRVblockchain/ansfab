FROM golang:1.12 as build-stage
RUN cd /go/src && mkdir elastic
WORKDIR /go/src/elastic
ENV GO111MODULE=on
COPY . .
RUN export GO111MODULE=on && GOSUMDB=off GOPROXY=direct go build -o elk ./cmd/main.go

# production stage
FROM alpine:3.9 as production-stage
COPY --from=build-stage /go/src/elastic/elk /go/src/elastic/elk
COPY --from=build-stage /go/src/elastic/entrypoint.sh /go/src/elastic/entrypoint.sh
COPY --from=build-stage /go/src/elastic/config.yaml /go/src/elastic/config.yaml
WORKDIR /go/src/elastic
RUN apk add --no-cache libc6-compat
EXPOSE 8888
ENTRYPOINT ["./elk"]