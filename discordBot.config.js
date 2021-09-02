module.exports = {
    apps: [
        {
            name: "discordBot",
            script: "./dist/discordBot.js",
            cwd: "/home/ubuntu/rflxn_discord_bot/",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            error_file: "/home/ubuntu/logs/rflxn_discord_bot/discord_bot_error.log",
            out_file: "/home/ubuntu/logs/rflxn_discord_bot/discord_bot_out.log"
        },
        {
            name: "authServer",
            script: "./dist/bungieAuthServer.js",
            cwd: "/home/ubuntu/rflxn_discord_bot/",
            log_date_format: "YYYY-MM-DD HH:mm Z",
            error_file: "/home/ubuntu/logs/rflxn_discord_bot/auth_error.log",
            out_file: "/home/ubuntu/logs/rflxn_discord_bot/auth_out.log"
        }
    ]
}