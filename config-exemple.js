class Config{
    static createConfig(){
        global.config = {
            port: process.env.PORT || 3000,
            secret: "",
            jwt:{
                secret: "",
                expiresIn: ''
            },
            db:{
                name: "",
                url: "",
                username: "",
                password: ""
            },
            mail:{
                host: "",
                port: 25,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "",
                    pass: ""
                },
                tls: { rejectUnauthorized: false },
                to: ""
            }
        }
    }
}


module.exports = Config.createConfig()