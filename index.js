// npm i keyv @keyv/sqlite pify discord.js@13

console.log(require('discord.js').version)
require("dotenv").config();
const { Client, Intents, MessageEmbed, Permissions, MessageActionRow,  MessageButton, } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });
// const fs = require('fs');

const Keyv = require('keyv');
const levels = new Keyv('sqlite://db.sqlite', { table: 'levels' });
const db = new Keyv(`sqlite://role.sqlite`, { table: "role" });//@keyv/sqlite
const prefix = '!'
// let connections = {};
// let speak_chs = {};

LOG_CHANNEL_ID = '937190204693958706'

client.on('ready', () => {
    //This will get the amount of servers and then return it.
    const servers = client.guilds.cache.size
    // const users = client.users.cache.size
    
    console.log(`Botは今 ${servers} 個のサーバーに入ってるよー`)

    client.user.setActivity(`!help | 導入数 ${servers} `, {
        type: 'PLAYING',
    })
})
client.on('messageCreate', async message => {

    async function sendError(err) {
        const err_embed = new MessageEmbed({
            description: '```\n' + err.toString() + '\n```',
            footer:{
                text: `サーバー: ${message.guild.id} | ${message.content}`
            }
        })
        const ch = await client.channels.fetch(LOG_CHANNEL_ID)
        if (ch) {
            ch.send({embeds: [err_embed]})
        }
    }

    if (message.author.bot) {
        return;
    }

    if (message.content.indexOf(prefix) !== 0) return;
    const [command, ...args] = message.content.slice(prefix.length).split(' ')

    switch (command) {
        case 'gsh':
            flag = 1;
            let msg = '検索したいキーワード';
            // let channel = message.channel;
            // let author = message.author.username;

            message.reply(msg)
                .then(() => console.log(`Sent message: ${msg}`))
                .catch(console.error);

            if (flag === 1) {
                flag = 0;
                // let channel = message.channel;
                // let author = message.author.username;
                let url_val = 'https://www.google.com/search?q='
                for (let i = 0; i < args.length; i++) {
                    url_val += "+" + encodeURI(args[0]);
                }

                message.reply(url_val)
                    .then(() => console.log(`Sent message: ${url_val}`))
                    .catch(console.error);
                return;
            }
        break;

        case 'support':
            var embed = new MessageEmbed({
                title: "サポートサーバーです",
                description: "SupportServer",
                color: 0xffff00,
                fields: [{
                    name: "URL",
                    value: "https://discord.gg/Y6w5Jv3EAR",
                    inline: false,
                }] 
            })
            message.channel.send({embeds: [embed]});
        break;

	case 'help':
            var embed = new MessageEmbed({
                title: "helpです",
                description: "This is Help commands",
                color: 0xffff12,
                fields: [                    {
                        name: "!help",
                        value: "今、表示しているやつです"
                    },
                    {
                        name: "!in",
                        value: "botのリンクを出します"
                    },
                    {
                        name: "!ping",
                        value: "ping値を出します"
                    },
                    {
                        name: "!support",
                        value: "サポサバのURLを表示します"
                    },
                    {
                        name: "aml",
                        value: "KuronekoServerの運営紹介"
                    },
                    {
                        name: "!c <消したい量の数> (管理者のみです)",
                        value: "指定した数分のメッセージを削除できます"
                    },
                    {
                        name: "!g-rule",
                        value: "グローバルチャットの利用規約を出します"
                    },
                    {
                        name: "!web",
                        value: "このBOTのサイトを表記します"
                    },
                    {
                        name: "!user [メンションもしくはID]",
                        value: "ユーザー情報を出せます"
                    },
                    {
                        name: "グローバルチャット",
                        value: "このチャンネルを作成するとグローバルチャットが使用できます"
                    },
                    {
                        name: "!player [ID]",
                        value: "Minecraftのユーザー情報を出せます"
                    },
                    {
                        name: "!beserver [IP]",
                        value: "MinecraftServer(be)情報を出せます"
                    },
                    {
                        name: "!server [IP]",
                        value: "MinecraftServer情報を出せます"
                    },
                    {
                        name: "!uuid [MCID]",
                        value: "MinecraftユーザーUUID情報を出せます"
                    },
                    {
                        name: "!poll [タイトル] [投票1] [投票2] ● ● ●",
                        value: "投票ができます"
                    },
                    {
                        name: "!ban [メンションまたはID]",
                        value: "ユーザーをBANします"
                    },
                    {
                        name: "!omikuji",
                        value: "コマンドの通りおみくじだよ"
                    },
                    {
                        name: "!gsh 検索する文字",
                        value: "Google検索"
                    },
                    {
                        name: "!timeout [ユーザーID、またはメンション] [タイムアウトする時間(分)]",
                        value: "ユーザーをタイムアウトします。"
                    },
                    {
                        name: "!untimeout",
                        value: "タイムアウトしたユーザーを解除する。"
                    },
                    {
                        name: "!tc [ticketのタイトル]",
                        value: "ticketを作ります。"
                    },
                    {
                        name: "!level",
                        value: "現在のレベルを表示します"
                    }

                ]
            })
            message.channel.send({embeds: [embed]})
        break;

        case 'omikuji':
            let arr = ["大吉", "中吉", "小吉", "吉", "凶", "大凶"];
            var random = Math.floor(Math.random() * arr.length);
            var result = arr[random];
            message.reply({content: result});
        break;

        case 'ping':
            message.channel.send({content: ` Ping を確認しています...`})
            .then((pingcheck) => {
                pingcheck.edit(
                    `botの速度|${pingcheck.createdTimestamp - message.createdTimestamp} ms`
                )
            });
        break;

	case 'c':
    	if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("❌ 権限が不足しています。"); //権限がなかったら表示
    	if (!args[0]) return message.channel.send("エラー: 空白がない または数字が書いていません"); //空白がないまたは数字がない場合表示
    	if (args[0] > 100) return message.channel.send({content: "エラー: 削除する数は100以下で指定してください。"})
    	if (isNaN(args[0])) return message.channel.send({content: "エラー: 削除する数は数字で指定してください。"})
    	const messages = await message.channel.messages.fetch({
        	limit: args[0]
    	}); //していした数を削除
    	message.channel.bulkDelete(messages)
    	.then((msg) => {
        	return message.channel.send({content: `${msg.size} メッセージ 削除しました。`})
    	})
    	.catch(reason => {
        	sendError(reason)
        	return message.channel.send({ content: "エラーが発生しました" })
    	})
    
    
	break;

        case 'g-rule':
            var embed = new MessageEmbed({
                title: "グローバルチャット利用規約",
                description: "グローバルチャットの利用を始めたときに利用規約同意したものとみなします。",
                color: 0xffff00,
                fields: [
                    {
                        name: "1.個人情報の送信禁止。例外あり",
                        value: "(送信可能、都道府県・年齢 送信禁止、電話番号・生年月日・市・丁目・マンション名・学校名・マイナンバー・その他、個人情報が特定できそうなのは禁止)"
                    },
                    {
                        name: "2.宣伝禁止。例外あり",
                        value: "(自分のディスコ―ドサーバー招待URL・BotURL・自分のサイトURLは禁止/Owner・Admin・moderatorから、許可する場合もあります。)※ Admin-運営 moderator-モデレーター の方は許可。"
                    },
                    {
                        name: "3.R-18系禁止",
                        value: "(R-18などを送信した場合、そのサーバーでの利用を停止)"
                    },
                    {
                        name: "4.スパム禁止",
                        value: "(あいうえお、など、連続チャットは禁止。負荷軽減の為、2.3秒開けての投稿をおねがいします。)"
                    },
                    {
                        name: "5.他のユーザーに成りすまし禁止",
                        value: "(ほかのユーザーと同じアイコン・名前などはできるだけ控えてください。)"
                    },
                    {
                        name: "6.その他、Owner・Adminが禁止するみなす行為禁止",
                        value: "(この利用規約はいつでも改訂しますので、何日がごとに見ることをおすすめします。(Botから見ている場合: $g-ruleで見れます。 )"
                    },
                    {
                        name: "規約情報",
                        value: "2021/03/22"
                    }
                ]
            });
            message.channel.send({embeds: [embed]});
        break;

        case 'web':
            var embed = new MessageEmbed({
                title: "webサイトです",
                description: "",
                color: 0xffff00,
                fields: [{
                    name: "webサイトです",
                    value: "https://kuroneko6423.com/"
                }]
            })
            message.channel.send({embeds: [embed]});
        break;

        case 'PrivacyPolicy':
            var embed = new MessageEmbed({
                title: "Privacy Policy",
                description: "botのプライバシーポリシーです",
                color: 0xffff00,
                fields: [{
                    name: "DiscordBot Privacy Policy",
                    value: "https://kuroneko6423.com/PrivacyPolicy/"
                }]
            })
            message.channel.send({embeds: [embed]});
        break;

        case 'aml':
            var embed = new MessageEmbed()
                .setTitle("KuronekoServer運営List")　//Embedのタイトル
                .setURL("https://kuroneko6423.com/Admin")　//タイトルに埋め込むURL
                .setAuthor("KuronekoServerAdminList", "https://raw.githubusercontent.com/KuronekoServer/icon/main/kuroneko-logo.png") //Embedのアウター
                .setThumbnail("https://raw.githubusercontent.com/KuronekoServer/icon/main/kuroneko-logo.png")　//Embedのサムネイル
                .addField("KuronekoServer WebSite", "https://kuroneko6423.com")　//Embedのフィールド
                .addField("黒猫ちゃん(Owner)", "オーナー")　//Embedのフィールド
                .addField("ねこかわいいさん(Admin)", "全面的な管理")　//Embedのフィールド
	        .addField("?Sw()m%kLc$VfD!さん(Admin)", "全面的な管理")　//Embedのフィールド
                .addField("Nabrさん(Admin)", "サーバー関係管理")　//Embedのフィールド
	    	.addField("yukunさん(Server related)", "サーバー関係管理")　//Embedのフィールド
                .addField("Yuukiさん(moderator)", "荒らし対策管理")　//Embedのフィールド
                .addField("ぷとんさん(developer)", "js部門")　//Embedのフィールド
	        .addField("BR(BURI)さん(developer)", "js部門")　//Embedのフィールド
                .addField("🍊.exeさん(developer)", "py,js部門")　//Embedのフィールド
                .addField("!¿֍𝓪𝓷𝓶𝓸𝓽𝓲֍?¡さん(developer)", "js部門")　//Embedのフィールド
	        .addField("ap12さん(developer)", "js部門")　//Embedのフィールド
	        .addField("yutarou1241477さん(developer)", "py部門")　//Embedのフィールド
                .setFooter("KuronekoServer")　//Embedのフッター
                .setColor("RANDOM")　//Embedのカラー
                .setTimestamp();

            message.channel.send({embeds: [embed]}); 
        break;

//bot導入宣伝
        case 'in':
            var embed = new MessageEmbed({
                title: "BOT導入",
                description: "こちらから導入してください",
                color: 0xffff00,
                fields: [
                    {
                        name: "BOTリンク",
                        value: "bot導入URL https://discord.com/api/oauth2/authorize?client_id=894075966224220233&permissions=8&scope=bot"
                    }
                ]
            })
            message.channel.send({embeds: [embed]});
        break;

//MinecraftServerルール
        case 'MinecraftRule':
            var embed = new MessageEmbed({
                title: "～～minecraftServer Rule",
                description: "",
                color: 0xffff15,
                fields: [
                    {
                        name: "マインクラフト",
                        value: "禁止事項"
                    },
                    {
                        name: "第1条",
                        value: "荒らし禁止"
                    },
                    {
                        name: "第2条",
                        value: "チート機能禁止（xrayなど）"
                    },
                    {
                        name: "第3条",
                        value: "暴言禁止"
                    },
                    {
                        name: "第4条",
                        value: "窃盗禁止"
                    },
                    {
                        name: "第5条",
                        value: "他人の建築物を勝手に改造するのも禁止"
                    },
                    {
                        name: "第6条",
                        value: "ophack禁止"
                    },
                    {
                        name: "第7条",
                        value: "これのルールに対して変更等がある場合には運営側がルールを変更する場合がある"
                    },
                    {
                        name: "第8条",
                        value: "第1条から第7条までに同意できる方のみserverに参加を許可する"
                    },
                    {
                        name: "その他",
                        value: "これに対して運営は変更を加えられるものとする"
                    },
                    {
                        name: "その他ルール",
                        value: "注意点等"
                    },
                    {
                        name: "第1条",
                        value: "鯖の自作発言は禁止"
                    },
                    {
                        name: "第2条",
                        value: "配信,録画する際は運営に必ず言ってください。"
                    }
                ]
            })
            message.channel.send({embeds: [embed]});
        break;

//ユーザー情報
        case 'user':
            let user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
            if (!user_id) return message.channel.send({ content: "エラー: IDが入力されていません" });

            const member = message.guild.members.cache.get(user_id);
            if (!member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })

            const presence_data = {"online": "オンライン", "offline": "オフライン", "dnd": "取り込み中", "idle": "退席中"}
            message.channel.send({
                embeds:[
                    {
                        title: `───${member.user?.username}の情報───`,
                        description: `${member.user?.username}の情報を表示しています`,
                        color: "RANDOM", //色
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.guild.iconURL(),
                            text: `サーバー名：${message.guild.name}`
                        },
                        thumbnail: {
                            url: member.user.avatarURL()
                        },
                        fields: [
                            {
                                name: "ユーザータグ",
                                value: `${member.user.tag}`
                            },
                            {
                                name: "ユーザーメンション",
                                value: `${member}`
                            },
                            {
                                name: "ユーザーID",
                                value: `${member.id}`
                            },
                            {
                                name: "アカウントの種類",
                                value: member.bot ? "BOT" : "ユーザー",
                                inline: true
                            },
                            {
                                name: "現在のステータス",
                                value: `${presence_data[member.presence?.status]}`,
                                inline: true
                            },
                            {
                                name: "userguild",
                                value: `${member.guild}`
                            },
                            {
                                name: "サーバー参加日数",
                                value: '${period}',
                                inline: true
                            }
                        ]
                    }
                ]
                
            });
        break;

//アンケート機能
        case 'poll':
            const [title, ...choices] = args
            if (!title) return message.channel.send({content: 'タイトルを指定してください'})
            const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']

            if (choices.length < 2 || choices.length > emojis.length)
              return message.channel.send({content: `選択肢は2から${emojis.length}つを指定してください`})
            const poll = await message.channel.send({
                embeds: [
                    {
                        title: title,
                        description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
                    }
                ]
            });
            emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
        break;

//BAN機能
        case 'ban':
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send("❌ 権限が不足しています。"); //権限がなかったら表示
            
            const ban_user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
            if (!ban_user_id) return message.channel.send({ content: "エラー: メンバーが指定されていません\nIDかメンションで指定してください" });
            const ban_member = message.guild.members.cache.get(ban_user_id);
            if (!ban_member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })
            if(!ban_member.bannable) return message.channel.send({ content: "エラー: Botより上の役職を持っているメンバーをBanすることはできません。" })
            ban_member.ban()
            .then((banned_user) => {
                return message.channel.send({ content: `${banned_user.user.tag} をBanしました`})
            })
            .catch(reason => {
                console.warn(reason)
                return message.channel.send({ content: "エラーが発生しました"})
            })
        break;
        
//kick機能
        case 'kick':
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("❌ 権限が不足しています。"); //権限がなかったら表示
            
            const kick_user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
            if (!kick_user_id) return message.channel.send({ content: "エラー: メンバーが指定されていません\nIDかメンションで指定してください" });
            const kick_member = message.guild.members.cache.get(kick_user_id);
            if (!kick_member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })
            if(!kick_member.kickable) return message.channel.send({ content: "エラー: Botより上の役職を持っているメンバーをKickすることはできません。" })
            kick_member.kick()
            .then((kicked_user) => {
                return message.channel.send({ content: `${kicked_user.user.tag} をKickしました`})
            })
            .catch(reason => {
                console.warn(reason)
                return message.channel.send({ content: "エラーが発生しました"})
            })
        break;
//ロール付与(API対策) : Code by Puton
        case 'addrole':
            if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.channe.send("❌ 権限が不足しています。"); //権限不足時

            const role_id = (message.mentions.roles.size > 0) ? message.mentions.roles.first().id : args[0];
            if (!role_id) return message.channel.send({ content: 'エラー: ロールが指定されていません\nIDかメンションで指定してください', ephemeral: true });
            const role = message.guild.roles.cache.get(role_id);
            message.guild.members.fetch()
            .then(members => { 
                const users = members.filter(member => !member.user.bot) //bot以外のメンバーに絞る
                users.map(async member => {
                await timeout(3000); //API回避のために3秒ずつ付与
                member.roles.add(role);
              })
            })
            .catch(err => {
                console.warn(err);
                const embed = new MessageEmbed()
                .setTitle("エラー")
                .setDescription("コマンド: `addrole`でエラーが発生しました。")
                
                return message.channel.send({ embeds: [embed], ephemeral: true });
            });
            message.channel.send(`${role.name}を付与します。\n> この処理には時間がかかることがあります。`);
        
            function timeout(time) {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, time);
              });
            };
    }
})

//level機能
 client.on('messageCreate', async (message) => {
   // ボットは除外する
   if (message.author.bot) return;
 
   // ユーザーのレベルを取得する。なければ{ count: 0, level: 0 }にする
   const level = (await levels.get(message.author.id)) || { count: 0, level: 0 };
 
   // カウントを1増やす
   level.count += 1;
   // カウントが100になったら0にして、レベルを1増やす
   if (level.count >= 100) {
     level.count = 0;
     level.level += 1;
   }
 
   // ユーザーのレベルを保存する
   levels.set(message.author.id, level);
 
   // !levelコマンドで現在のレベルを出す
   if (message.content === '!level') {
     message.channel.send(
       `現在のレベルは ${level.level} です。次のレベルまであと ${100 - level.count}`
     );
   }
 });

//自動返信
client.on('messageCreate', async message => {

    var msg = null

    if (message.author.bot) return;

    switch (message.content){
        case 'こんにちは':
            msg = '...こんにちは～'
        break;
        case 'おはよう':
            msg = 'おはようです...(眠たい...)'
        break;
        case 'おはようございます':
            msg = 'おはようございま～す！'
        break;
        case 'なにしてるの？':
            msg = '私も気になる！'
        break;
        case 'おやすみなさい':
            msg = 'おやすみ～'
        break;
        case 'こんばんは':
            msg = 'こんばんは！'
        break;
        case 'こんばんはー':
            msg = 'こんばんちわ！'
        break;
        case 'おはようー':
            msg = 'おはようです！！'
        break;
        case 'おはー':
            msg = 'おはよ～うオーディションして....ってあぁぁぁぁぁぁぁぁ。絶対聞かなかったことにしてくださいね！'
        break;
        case '暇':
            msg = '雑談します？ [Botだけどね]'
        break;
        case '課題':
            msg = '課題なんて燃やしちゃえ★'
        break;
        case 'は？':
            msg = '怒らないで(´;ω;｀)'
        break;
        case 'あ？':
            msg = '怒らないで(´;ω;｀)'
        break;
        case '嫌い':
            msg = 'そんなこと言わないで(´;ω;｀)'
        break;
        case 'あけおめ':
            msg = 'あけおめ！ :boom::boom::boom: '
        break;
        case 'あけおめ':
            msg = 'Yuuki誕生日おめでとう！'
        break;
        case '誕生日おめでとう！':
            msg = '誕生日おめでとおおおおおおお！'
        break;
        case '誕生日':
            msg = 'おめでとおおお！88888888'
        break;
        case 'たんおめ':
            msg = '誕生日おめでとおおおおおおお！'
        break;
    }
    if (msg){
        message.channel.send({content: msg})
    }
})

//グローバルチャット
client.on("messageCreate", message => {
    if (message.author?.bot || message.channel.name != "グローバルチャット") return;
    
        client.channels.cache.forEach(ch => {
            console.log(ch.name)
            if (ch.type == "GUILD_TEXT" && ch.name === "グローバルチャット") {
                var embed = new MessageEmbed({
                    title: "",
                    color: "RANDOM",
                    description: message.content, // メッセージの内容を説明欄に
                    timestamp: new Date(), // 時間を時間の欄に
                    footer: {
                        icon_url: message.guild.iconURL(), // フッターのアイコンのURLをメッセージが送信されたサーバーのアイコンのURLに
                        text: message.guild.name // 文字をサーバーの名前に
                    },
                    image: {
                        url: message.attachments.first() || null//もしメッセージの中にファイルが有るなら、メッセージの中のはじめのファイルのURLを。無いならnull(無し)を。
                    },
                    author: {
                        name: message.author.tag,//メッセージの送信者のタグ付きの名前を送信者名の欄に
                        url: `https://discord.com/users/${message.author.id}`,//名前を押すとその人のプロフィールが出されるように(https://discord.com/users/ その人のID)
                        icon_url: message.author.displayAvatarURL({ format: 'png' })//メッセージ送信者のアイコンのURLを送信者のアイコンの欄に
                    }
                });
                ch.send({embeds: [embed]})
                .catch(e => console.log(e))
            };
        });
        message.delete({ timeout: 1000 }).catch((e) => message.channel.send(`メッセージを削除する際にエラーが起きました\nエラー:${e.message}`))  
    })

//timeout機能
.on('messageCreate', message => {
  if(message.content.startsWith("!timeout")){
if(!message.member.permissions.has("MODERATE_MEMBERS")||!message.channel.permissionsFor(message.guild.me).has("MODERATE_MEMBERS")) return message.reply("権限不足");
    const args = message.content.split(" "),member = message.mentions.members.first()??message.guild.members.cache.get(args[1]);
    if(!member) return message.reply(`ユーザーが見つかりませんでした`);
    if(isNaN(args[2])) return message.reply(`数字を入れてください`);
    member.timeout(Number(args[2]) * 60 * 1000, args.slice(3)?.join(" ")||`なし`)    
    .then(message.reply(`正常にタイムアウトしました\n詳細\n対象ユーザー:${member} 時間:${args[2]}分 理由:${args.slice(3)?.join(" ")||"なし"}`))
    .catch(e=>message.reply(`エラー:${e}`));
  }
  if(message.content.startsWith("!untimeout")){
    if(!message.member.permissions.has("MODERATE_MEMBERS")||!message.channel.permissionsFor(message.guild.me).has("MODERATE_MEMBERS")) return message.reply("権限不足");
    const args = message.content.split(" ")[1],member = message.mentions.members.first()??message.guild.members.cache.get(args);
    if(!member) return message.reply(`ユーザーが見つかりませんでした`);
    member.timeout(0)
    .then(message.reply(`正常にタイムアウトを解除しました\n対象ユーザー${member}`))
    .catch(e=>message.reply(`エラー:${e}`));
  }
})

//ticket機能
client.on('messageCreate', async message => {
  if (message.content.startsWith("!tc")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send('NOADOMIN');
      const args = message.content.split(" ").slice(1);
      if (!args[0]) return message.reply("コンテンツがないよ");
      const tic1 = new MessageButton().setCustomId("ticket").setStyle("PRIMARY").setLabel("チケット");
      await message.channel.send({
          embeds: [{
              description: String(args.join(" "))
          }],
          components: [new MessageActionRow().addComponents(tic1)]
      });
      if(message.guild.channels.cache.find(name => name.name === "ticket")) return;
      message.guild.channels.create('ticket',{
         type: 'GUILD_CATEGORY'
        });
        //ticketというカテゴリーを作る
  }
});
client.on('interactionCreate', async(interaction) => {
  if (interaction.customId === "ticket") {
      const ticketid = interaction.user.id
      if (interaction.guild.channels.cache.find(name => name.name === ticketid)) return interaction.reply({
          content: "これ以上作れないよ",
          ephemeral: true
      });
      const ct = interaction.guild.channels.cache.find(name => name.name === "ticket")
      if(!ct) return interaction.channel.send("ticketカテゴリーがありません");
      interaction.guild.channels.create(ticketid, {
          permissionOverwrites: [{
              id: interaction.guild.roles.everyone,
              deny: ['VIEW_CHANNEL']
          }],
          parent: ct.id
      }).then(channels => {
          channels.permissionOverwrites.edit(interaction.user.id, {
              VIEW_CHANNEL: true
          });
          const tic2 = new MessageButton().setCustomId("close").setStyle("PRIMARY").setLabel("閉じる");
          //buttonを作成
          channels.send({
              embeds: [{
                  description: "チケットを閉じますか?"
              }],
              components: [new MessageActionRow().addComponents(tic2)]
          })
          interaction.reply({
              content: `${channels}を作りました`,
              ephemeral: true
          });
      }).catch(e => interaction.reply(`エラー:${e.message}`))
  }
  if (interaction.customId === "close") {
    //buttonIDがcloseのボタンが押されたら実行
      interaction.channel.delete().catch(e => interaction.reply(`エラー:${e.message}`))
  }
});

//メッセージURL展開======================================
client.on('messageCreate', async message => {
  const re = /https:\/\/discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/
  const results = message.content.match(re)
  if (!results) {
    return
  };
  if (message.author.bot) {
    return;
  }
  const guild_id = results[1]
  const channel_id = results[2]
  const message_id = results[3]

  const channelch = client.channels.cache.get(channel_id);
  if (!channelch) {
    return;
  }

  channelch.messages.fetch(message_id)
    .then(msg => {
      const msgpanel = new MessageEmbed()
      .setDescription(`${msg.content}`)
      .setAuthor({name: `${msg.author.username}`, iconURL: msg.author.avatarURL({ dynamic:true })})
      .setTimestamp(msg.createdAt)
      .setFooter({text: `${msg.channel.name}`, iconURL: `${msg.guild.iconURL() == null ? "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" : msg.guild.iconURL()}`})

      if (msg.attachments) {
          msgpanel.setImage(`${msg.attachments.map(attachment => attachment.url)}`)
      } else {
          ;
      }

      message.reply({ embeds: [msgpanel] })

      if (msg.embeds[0]) {
          message.channel.send({ embeds: [msg.embeds[0]] });
      } else {
          ;
      }
  })
      .catch(console.error);
});
client.on('messageCreate', async message => {
  const re = /https:\/\/ptb.discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/
  const results = message.content.match(re)
  if (!results) {
    return
  };
  if (message.author.bot) {
    return;
  }
  const guild_id = results[1]
  const channel_id = results[2]
  const message_id = results[3]

  const channelch = client.channels.cache.get(channel_id);
  if (!channelch) {
    return;
  }

  channelch.messages.fetch(message_id)
    .then(msg => {
      const msgpanel = new MessageEmbed()
      .setDescription(`${msg.content}`)
      .setAuthor({name: `${msg.author.username}`, iconURL: msg.author.avatarURL({ dynamic:true })})
      .setTimestamp(msg.createdAt)
      .setFooter({text: `${msg.channel.name}`, iconURL: `${msg.guild.iconURL() == null ? "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" : msg.guild.iconURL()}`})

      if (msg.attachments) {
          msgpanel.setImage(`${msg.attachments.map(attachment => attachment.url)}`)
      } else {
          ;
      }

      message.reply({ embeds: [msgpanel] })

      if (msg.embeds[0]) {
          message.channel.send({ embeds: [msg.embeds[0]] });
      } else {
          ;
      }
  })
      .catch(console.error);
});
client.on('messageCreate', async message => {
  const re = /https:\/\/canary.discord\.com\/channels\/(\d{16,19})\/(\d{16,19})\/(\d{16,19})/
  const results = message.content.match(re)
  if (!results) {
    return
  };
  if (message.author.bot) {
    return;
  }
  const guild_id = results[1]
  const channel_id = results[2]
  const message_id = results[3]

  const channelch = client.channels.cache.get(channel_id);
  if (!channelch) {
    return;
  }

  channelch.messages.fetch(message_id)
    .then(msg => {
      const msgpanel = new MessageEmbed()
      .setDescription(`${msg.content}`)
      .setAuthor({name: `${msg.author.username}`, iconURL: msg.author.avatarURL({ dynamic:true })})
      .setTimestamp(msg.createdAt)
      .setFooter({text: `${msg.channel.name}`, iconURL: `${msg.guild.iconURL() == null ? "https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png" : msg.guild.iconURL()}`})

      if (msg.attachments) {
          msgpanel.setImage(`${msg.attachments.map(attachment => attachment.url)}`)
      } else {
          ;
      }

      message.reply({ embeds: [msgpanel] })

      if (msg.embeds[0]) {
          message.channel.send({ embeds: [msg.embeds[0]] });
      } else {
          ;
      }
  })
      .catch(console.error);
});
//メッセージURL展開終わり===================================

// サーバーにいるメンバーにロールを全員に付与するやーつ
client.on('messageCreate', message => {
   if (!message.guild) return // サーバーでない場合は無視
   
   if (message.content === '!add-role-all-members') { // メッセージの内容が「!add-role-all-members」だったら
     message.guild.members.fetch() // メンバーを全員取得
       .then(members => Promise.all(members.map(member => member.roles.add('役職ID')))) // 全員に同じ役職を与える
       .catch(console.error)
   }
 })
// 終わり

// banlist
// client.on('messageCreate', async message => {
//   if (message.content === '!admin-bans' && message.guild) {
//     const bans = await message.guild.bans.fetch()
//     message.channel.send(bans.map(ban => ban.user.tag).join(', ') || 'none')
//   }
//  })

const newbutton = buttondata => {
    //独自の関数を作る(ボタン作成の関数)
    return {
        components: buttondata.map(data => {
            return { custom_id: data.id, label: data.label, style: data.style || 1, type: 2 }
        }),
        type: 1
    }
    //JSON型で返す
};
let us = [];
//usにからの配列を代入する
let checkus = [];
//checkusにからの配列を代入する
client.on("messageCreate", async message => {
    //messageCreateイベントを発火させてmessageにclassを代入して渡す
    if (message.content == "!認証画面") {
        //messageのcontentのプロパティが!画面表示だったらカッコ内の処理をする
        if (!await db.get(message.guild.id)) return message.reply("ロールをsetしてください");
        //dbにメッセージが打たれたギルドIDが保存されているか判定してなかったら注意のメッセージを送信する
        message.reply({
            //メッセージ送信
            embeds: [{
                description: "認証します\n認証ボタンでスタート\n出てきた数字順に数字のボタンを押してください\n完了したらもう一度認証ボタンを押してください\n認証失敗や、やり直したい場合は消ボタンを押してください"
            }],
            //embedを指定する
            components: [
                newbutton([{ id: "id1", label: "1" }, { id: "id2", label: "2" }, { id: "id3", label: "3" }]),
                newbutton([{ id: "id4", label: "4" }, { id: "id5", label: "5" }, { id: "id6", label: "6" }]),
                newbutton([{ id: "id7", label: "7" }, { id: "id8", label: "8" }, { id: "id9", label: "9" }]),
                newbutton([{ id: "check", label: "認証", style: 3 }, { id: "id0", label: "0" }, { id: "delete", label: "消", style: 4 }])
                //idがカスタムIDラベルが表示されるラベル
            ]
            //ボタンを指定するこの時初めに作ったnewbutton関数を呼び出す
        });
    };
    if (message.content.startsWith("!setrole")) {
        //messageのcontentのプロパティが!setroleだったらカッコ内の処理をする
        const args = message.content.split(" ")[1].replace(/[^0-9]/g, '');
        //打たれたメッセージの空白から1番目の値を数値のみにする
        const role = message.guild.roles.cache.get(args);
        //メッセージが打たれたギルドでそのロールがあるか判定する
        if (!role) return message.reply(`ロールが見つかりませんでした\n${args}`);
        //なかったら注意のメッセージを送信する
        const check = await message.guild.me.roles.add(role).catch(e => message.reply(`エラーが発生しました\nerror:${e}`));
        //取得したロールを自分につけて権限が問題ないかチェックする
        if (check.content) return;
        //問題があったら処理しない
        await db.set(message.guild.id, args);
        //DBにメッセージギルドをkeyにして値をロールIDにする
        message.reply("完了しました");
        //処理が終わったら完了のメッセージを送る
    };
});
client.on("interactionCreate", async interaction => {
    //interactionのイベントを発火させてinteraction classをinteractionに代入する
    if (interaction.customId.startsWith("id")) {
        //customIDの初めの値がidだったら実行する
        if (!us[interaction.userId]) return interaction.reply({ content: "認証ボタンを押してください", ephemeral: true });
        //usのinteraction.userIdに何も保存されていなかったら注意のメッセージを送信する
        await interaction.deferUpdate();
        //interactionをアップデートする
        try {
            //エラーが出ないか試す
            checkus[interaction.userId].push(interaction.customId.slice(2))
            //checkusのinteraction.userIdに押された番号の数値を追加する
        } catch (e) {
            //エラーが起きた場合
            interaction.followUp({ content: "Time outしました", ephemeral: true })
            //エラーが起きるのは大体checkusのinteraction.userIdが存在しない時なのでその旨を表示する
        };
    };
    if (interaction.customId == "check") {
        //カスタムIDがcheckだったら処理
        if (!us[interaction.userId]) {
            //usにユーザーIDのプロパティがなかったら処理する
            let num = [];
            //numにからの配列を代入する
            for (i = 0; i < 4; i++)num.push(Math.floor(Math.random() * 9))
            //4桁の数値を一個一個配列にしてnumに保存
            us[interaction.userId] = num;
            //usのユーザーIDのプロパティに作成したnumを代入
            checkus[interaction.userId] = [];
            //checkusのユーザーIDのプロパティにからの配列を代入
            interaction.reply({
                //メッセージ送信
                embeds: [{
                    description: `あなたの認証コードは\n${num.join(",")}\n600秒以内に完了させてください`
                }],
                //embedを設定する
                ephemeral: true
                //その人にしか見えないようにする
            });

            setTimeout(() => {
                //600*1000ms(600s)たったら処理をする
                try {
                    //試す
                    delete us[interaction.userId];
                    delete checkus[interaction.userId];
                    //メモリーを開けるために古いデータを消す
                } catch (e) {
                    //古いデータがなかったときにエラーが出るのでerrorハンドリングする
                }
            }, 600 * 1000);
        } else {
            //usにユーザーIDのプロパティがあったら処理する
            if (us[interaction.userId]?.join("") !== checkus[interaction.userId]?.join("")) return interaction.reply({ embeds: [{ description: `認証番号が違います\n認証番号${us[interaction.userId].join(",")}\nあなたが打ったコード${checkus[interaction.userId].join(",")}` }], ephemeral: true });
            //認証番号とその人が今まで打った番号を比較してあっていなかったらその旨を表示する
            try {
                //試す
                delete us[interaction.userId];
                delete checkus[interaction.userId];
                //古いデータを消す
            } catch (e) {
                //古いデータがなかったらエラーが出るのでエラーハンドリングをする
            };
            const role = await db.get(interaction.guildId);
            //dbからボタンが押されたギルドIDを使ってロールIDを取得する
            const check = await interaction.member.roles.add(role).catch(e => interaction.reply(`エラーが発生しました、サーバー管理者に問い合わせてください\nerror:${e}`));
            //ボタンを押した人にロールをつけるロールをつけるのに失敗したらその旨を表示する
            if (check.content) return;
            //ロールをつけられなかったらこの先処理しない
            interaction.reply({
                //メッセージを送信する
                embeds: [{
                    description: "認証成功"
                }],
                //embedを設定する
                ephemeral: true
                //その人にしか見えないようにする
            });
        }
    };
    if (interaction.customId == "delete") {
        //customIDがdeleteだったら処理をする
        if (!us[interaction.userId]) return interaction.reply({ content: "認証ボタンを押してください", ephemeral: true });
        //usのユーザーIDプロパティがなかったらその旨を表示する
        try {
            //試す
            checkus[interaction.userId] = [];
            //今まで打たれてきたデータをからの配列にする
        } catch (e) {
            //今まで打たれてきたデータがなかった場合にエラーが出るのでエラーハンドリングする
        };
        interaction.reply({ embeds: [{ description: "消しました" }], ephemeral: true });
        //完了したらその旨を表示する
    };
});

client.login(process.env.DISCORD_TOKEN).catch(err => console.warn(err));
