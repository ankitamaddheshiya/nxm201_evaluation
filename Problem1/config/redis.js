const redis = require("redis")
let redisClient = redis.createClient({
    url:"redis://default:8JH0z4uV0jfS6QH08fnosFEf2zu7jpBs@redis-12521.c246.us-east-1-4.ec2.cloud.redislabs.com:12521"
})

redisClient.on("error",(err) => {

    console.log("Redis Client")
} )


redisClient.connect();

module.exports = {
    redisClient
}