import { Client, Message } from "discord.js";

const Discord = require("discord.js");
const bot = new Discord.Client();
const Canvas = require("canvas");
import colors from "../../colors.json";

export default async (client: Client, message: Message, args: string[]) => {
    let user;

    if (!args[1]) {
        user = message.author;
    } else {
        user = message.mentions.users.first() || bot.users.cache.get(args[1]);
    }
    const member = message.guild?.member(user);

    const canvas = Canvas.createCanvas(500, 200);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
        "https://www.kellsolutions.com/wp-content/uploads/2019/07/1564233245.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = colors.white;
    ctx.strokeRect(0, 0, canvas.height, canvas.width);

    ctx.fillStyle = colors.white;
    let size1 = 40;
    let size2 = 30;
    let size3 = 30;

    const name = user.tag;
    do {
        ctx.font = `${(size1 -= 5)}px SansSerif`;
    } while (ctx.measureText(name).width > canvas.width - 225);
    ctx.fillText(name, 200, 65);

    const created = "Created: " + user.createdAt.toLocaleString();
    do {
        ctx.font = `${(size2 -= 5)}px SansSerif`;
    } while (ctx.measureText(created).width > canvas.width - 225);
    ctx.fillText(created, 200, 110);

    if (!member?.joinedAt) return null;
    const joined = "Joined: " + member.joinedAt.toLocaleString();
    do {
        ctx.font = `${(size3 -= 5)}px SansSerif`;
    } while (ctx.measureText(joined).width > canvas.width - 225);
    ctx.fillText(joined, 200, 145);

    ctx.beginPath();
    ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
        user.displayAvatarURL({ format: "jpg", size: 1024 })
    );
    ctx.drawImage(avatar, 25, 25, 150, 150);

    const finale = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "userinfo.png"
    );

    message.channel.send(finale);
};
