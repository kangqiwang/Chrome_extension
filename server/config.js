module.exports = {
	"port": "3333",
	"mongoDb": {
		"db" : "sm",
		"host" : "127.0.0.1",
		"port" : "27017"
	},
		mongoDbBackend: {
        db: "sm-backend",
        host: "127.0.0.1",
        port: "27017"
    },
	"es": {
        "host" : "127.0.0.1:6644"
    },
    "redisStore" : {
		"host": "127.0.0.1",
		"port": 6379
	}
}