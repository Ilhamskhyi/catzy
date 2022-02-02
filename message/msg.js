///CATZY - BOT POWER BY ILHAM - SKHYZI///
///jangan lu ubah owner nya,auto gua erorin///

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys-md")

const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");

const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const fetch = require('node-fetch');
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");
// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// DB Game
let tictactoe = [];
let tebakgambar = []


//Time 
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
                            
// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(kahfzxy, msg, m, setting) => {
	try {
	
		let { ownerNumber, botName, gamewaktu, limitCount } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
		const toJSON = j => JSON.stringify(j, null,'\t')
		if (kahfzxy.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (kahfzxy.nopref) {
				prefix = ''
			} else {
				prefix = kahfzxy.prefa
			}
		}
		
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber.includes(sender)
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = kahfzxy.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await kahfzxy.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user

		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return kahfzxy.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return kahfzxy.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return kahfzxy.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return kahfzxy.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
        
        if (kahfzxy.public) {
            if (!m.key.fromMe) return
}
         
        const troli = {
                         "key": {
                         "remoteJid": "status@broadcast", 
                         "participant": '0@s.whatsapp.net'
                    }, 
                         "message": {
                         "orderMessage": {
                         "itemCount": 687710621, 
                         "status": 200, 
                         
                         "surface": 200, 
                         "message": `𝐜𝐚𝐭𝐳𝐲-𝐛𝐨𝐭 𝐦𝐝 ./𝐈𝐥𝐡𝐚𝐦-𝐬𝐤𝐡𝐳𝐲𝐢 ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}`, 
                         "orderTitle": '𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒 ', 
                         "sellerJid": '0@s.whatsapp.net'
                    } 
                          } 
                              }
        async function sendPlay(from, query) {
           var url = await yts(query)
           url = url.videos[0].url
           hxz.youtube(url).then(async(data) => {
           	var button = [
			{ urlButton: { displayText: `ꜱ ᴏ ᴜ ʀ ᴄ ᴇ ᴠ ɪ ᴅ ɪ ᴏ`, url : ` https://youtu.be/${data.id}` } },
			
			{ quickReplyButton: { displayText: `𝙑𝙞𝙙𝙚𝙤 (${data.size})`, id: `${prefix}ytmp4 ${url}` } },
			{ quickReplyButton: { displayText: `𝘼𝙪𝙙𝙞𝙤 (${data.size_mp3})`, id: `${prefix}ytmp3 ${url}` } },
			{ quickReplyButton: { displayText: `𝙮𝙩𝙨𝙚𝙖𝙧𝙘𝙝 ${data.title}`, id: `${prefix}ytsearch https://youtu.be/${data.id}` } },
		]
var hg = `*Title :* ${data.title}\n*Quality :* ${data.quality}`
kahfzxy.sendMessage(from, { caption: hg, location: { jpegThumbnail: await getBuffer(data.thumb) }, templateButtons: button, footer: `𝙿𝚒𝚕𝚒𝚑 𝚂𝚊𝚕𝚊𝚑 𝚂𝚊𝚝𝚞 𝙱𝚞𝚝𝚝𝚘𝚗 𝙳𝚒 𝙱𝚊𝚠𝚊𝚑 𝙸𝚗𝚒 ↓`, mentions: [sender] })
           }).catch((e) => {
             kahfzxy.sendMessage(from, { text: mess.error.api },{ quoted: troli })
               ownerNumber.map( i => kahfzxy.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = kahfzxy.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = kahfzxy.sendMessage(from, { text: teks, mentions: mems },{ quoted: troli })
 		    }
		}
		const reply = (teks) => {
			kahfzxy.sendMessage(from, { text: teks },{ quoted: troli })
		}
		const textImg = (teks) => {
			return kahfzxy.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: troli })
		}
		const sendMess = (hehe, teks) => {
			kahfzxy.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return kahfzxy.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return kahfzxy.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: troli })
		}
		//Button 5 🗿🤙
		const buttonsDefault = [
			
			{ urlButton: { displayText: `𝙶𝙸𝚃𝙷𝚄𝙱`, url : `https://github.com/@Ilhamskhyi` } },
		{ callButton: { displayText: `𝙲𝙾𝙽𝚃𝙰𝙲𝚃`, phonenumber : `+62877710155i` } },
			{ quickReplyButton: { displayText: `𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁`, id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `𝙳𝙾𝙽𝙰𝚂𝙸`, id: `${prefix}donate` } },
				{ quickReplyButton: { displayText: `𝚁𝚄𝙻𝙴𝚂`, id: `${prefix}rules` } },
		]
		const buttonsDefault2 = [
			{ urlButton: { displayText: `𝙷𝙾𝚂𝚃𝙸𝙽𝙶`, url : `https://github.com/@Ilhamskhyi` } },
				{ callButton: { displayText: `𝚙𝚑𝚘𝚗𝚎 𝚗𝚞𝚖𝚋𝚎𝚛`, phoneNumber : `087773710155` } },
			{ quickReplyButton: { displayText: `⎙𝙶𝙴𝚃 𝙱𝙾𝚃`, id: `${prefix}sewa` } },
			{ quickReplyButton: { displayText: `⎙𝙼𝙴𝙽𝚄`, id: `${prefix}allmenu` } },
		]
		const buttonsDefault3 = [
			{ urlButton: { displayText: `𝙶𝚁𝙾𝚄𝙿 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿`, url : `https://chat.whatsapp.com/Hw1iYmAq8Cp2Ju64T7el09` } },
			{ quickReplyButton: { displayText: `⎙𝙽𝙴𝚇𝚃 𝙰𝚂𝙼𝙰𝚄𝙻𝙷𝚄𝚂𝙽𝙰`, id: `${prefix}asmaulhusna` } },
		]
		const buttonsDefault4 = [
			{ urlButton: { displayText: `𝙶𝚁𝙾𝚄𝙿 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿`, url : `https://chat.whatsapp.com/Hw1iYmAq8Cp2Ju64T7el09` } },
				{ quickReplyButton: { displayText: `⎙𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄`, id: `${prefix}allmenu` } },
		]
		const buttonsDefault5 = [
			{ urlButton: { displayText: `𝙶𝚁𝙾𝚄𝙿 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿`, url : `https://chat.whatsapp.com/Hw1iYmAq8Cp2Ju64T7el09` } },
		
			{ quickReplyButton: { displayText: `⎙𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁`, id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `⎙𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄`, id: `${prefix}allmenu` } },
		
		]
		
		const buttonsDefault7 = [
			{ urlButton: { displayText: ` 𝚌𝚊𝚝𝚣𝚢 𝚝𝚎𝚊𝚖`, url : `https://chat.whatsapp.com/Hw1iYmAq8Cp2Ju64T7el09` } },
			{ callButton: { displayText: `𝚙𝚑𝚘𝚗𝚎 𝚗𝚞𝚖𝚋𝚎𝚛`, phoneNumber : `087773710155` } },
			{ quickReplyButton: { displayText: `⎙𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄`, id: `${prefix}allmenu` } },
		
        ]
        	const buttonsDefault8= [
			{ urlButton: { displayText: `porno`, url : `https://www.xxnx.com` } },
			{ urlButton: { displayText: `hentai`, url : `https://www.hentai.com` } },
			{ quickReplyButton: { displayText: `⎙𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄`, id: `${prefix}allmenu` } },
		
        ]
        const buttonsDefault9= [
			{ urlButton: { displayText: `𝙷𝙾𝚂𝚃𝙸𝙽𝙶`, url : `https://replit.com/@Ilhamskhyi` } },
			
			{ quickReplyButton: { displayText: `⎙𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁`, id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `⎙𝙱𝙰𝙲𝙺 𝚃𝙾 𝙼𝙴𝙽𝚄`, id: `${prefix}bokepmenu` } },
		
        ]
        // TextTeplate 
        const textTemplateButtons = (from, text, footer, buttons) => {
            return kahfzxy.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
        }
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false



if (!isCmd && from.endsWith('@s.whatsapp.net')) {
 kahfzxy.anonymous = kahfzxy.anonymous ? kahfzxy.anonymous: {}
 let room = Object.values(kahfzxy.anonymous).find(room => [room.a, room.b].includes(sender) && room.state === 'CHATTING')
 if (room) {
if (/^.*(next|leave|start)/.test(body)) return
  if ([`${prefix}next`, `${prefix}leave`, `${prefix}start`, 'Cari Partner', 'Keluar', 'Next'].includes(body)) return
 let other = [room.a,
  room.b].find(user => user !== sender)
  if (type === "conversation") {
 kahfzxy.sendMessage(other, kahfzxy.message.conversation, text);
  } else {
 kahfzxy.sendMessageFromContent(other, kahfzxy.message)
  }
}
 }
		// Auto Read & Presence Online
		kahfzxy.sendReadReceipt(from, sender, [msg.key.id])
		kahfzxy.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		
		// Premium
		_prem.expiredCheck(kahfzxy, premium)

		// Tictactoe
		if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Game
		cekWaktuGame(kahfzxy, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, balance)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}

		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			// Main Menu
			case prefix+'allmenu':
			case prefix+'menuall':
			    var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./media/KahfzXzy.mp4'), templateButtons: buttonsDefault, footer: `
${ucapanWaktu}
ᴡɪʙ : ${wib}
ᴡɪᴛ : ${wit}
ᴡɪᴛᴀ : ${wita}
ᴜᴘᴛɪᴍᴇ :${runtime(process.uptime())}

⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true})
				break
case prefix+'next': case prefix+'leave': case prefix+"stop": {
kahfzxy.anonymous = kahfzxy.anonymous ? kahfzxy.anonymous: {}
 let room = Object.values(kahfzxy.anonymous).find(room => room.check(sender))
 if (!room) {
await textTemplateButtons(from, `you stop`,`Haha`,buttonsDefault7)
return false
 }
 reply('_You stopped matchmaking_')
 let other = room.other(sender)
 if (other) await textTemplateButtons(other, `you stop`,`Haha`,buttonsDefault7)
delete kahfzxy.anonymous[room.id]
 if (command === 'leave' || command === "stop") break
  }
case prefix+'mulai': case prefix+'start': case prefix+"anonymous": case prefix+"mutual": {
 kahfzxy.anonymous = kahfzxy.anonymous ? kahfzxy.anonymous: {}
  if (Object.values(kahfzxy.anonymous).find(room => room.check(sender))) {
 await textTemplateButtons(from, `Mencari Partner`,`Haha`,buttonsDefault7)
 return false
  }
  let room = Object.values(kahfzxy.anonymous).find(room => room.state === 'WAITING' && !room.check(sender))
  if (room) {
 await textTemplateButtons(room.a, `Partner Di temukan`,`Haha`,buttonsDefault7)
 room.b = sender
 room.state = 'CHATTING'
 await textTemplateButtons(room.b, `Partner Di temukan`,`Haha`,buttonsDefault7)
  } else {
 let id = + new Date
 kahfzxy.anonymous[id] = {
id,
a: sender,
b: '',
state: 'WAITING',
check: function (who = '') {
  return [this.a,
  this.b].includes(who)
},
other: function (who = '') {
  return who === this.a ? this.b: who === this.b ? this.a: ''
},
 }
 await textTemplateButtons(from, `Menunggu Partner`,`Haha`,buttonsDefault7)
  }
  break
}
case prefix+'menu':
			case prefix+'help':
			    var teks = `             ʜɪ ${pushname}
			 ᕙ ɪᴍ ᴄᴀᴛᴢʏ - ʙᴏᴛ ᴍᴅ ᕗ`
			   kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./media/KahfzXzy.mp4'), templateButtons: buttonsDefault2, footer: `̶↦ᴡɪʙ : ${wib}
̶↦ᴡɪᴛ : ${wit}
̶↦ᴡɪᴛᴀ : ${wita}
↦ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}

⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 

			break

case prefix+'ssweb':
if (args.length < 2) return reply(`Kirim Perintah ${command} link Mu\nContoh ${command} https://github.com/IlhamSkhyzi`)

  if (!isUrl(args[1])) return reply(mess.error.Iv)


  if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)

  reply(mess.wait)

  kahfzxy.sendMessage(from, { image: { url: `https://hardianto.xyz/api/tools/ssweb?url=${q}&apikey=hardianto`}})

  limitAdd(sender, limit)

  break
case prefix+'ts':
var ngntd = `hai`
kahfzxy.sendMessage(from, { caption: ngntd, video: fs.readFileSync('./media/KahfzXzy.mp4'), templateButtons: buttonsDefault4, mimetype: 'video/mp4', gifPlayback: true})
break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
		            break
			case prefix+'donate':
			case prefix+'donasi':
			 
var teks = `𝘿𝙊𝙉𝘼𝙎𝙄 𝙑𝙄𝘼 •

➥ 𝙂𝙊𝙋𝘼𝙔
➥ 𝙊𝙑𝙊
➥ 𝘿𝘼𝙉𝘼
➥ 𝙋𝘼𝙔𝙋𝘼𝙇
➥ 𝘽𝘼𝙉𝙆
➥ 𝙋𝙃𝙊𝙉𝙀𝙉𝙐𝙈𝘽𝙀𝙍
❍ 𝙉𝙀𝙓𝙏 → 𝙆𝙇𝙄𝙆 𝘽𝙐𝙏𝙏𝙊𝙉 ↓`
			  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/ham.mp4'), templateButtons: buttonsDefault9, footer: `̶silahkan pc owner untuk melanjutkan 
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
case prefix+'viral':
var teks = ` _*klik player gif to video 18+*_`  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/b1.mp4'), templateButtons: buttonsDefault9, footer: `̶ bokep mulu lu anj
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
			case prefix+'gangbang1':
var teks = ` _*klik player gif to video 18+*_`  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/b8.mp4'), templateButtons: buttonsDefault9, footer: `̶ gua gangbang mak lu sini
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
			case prefix+'gangbang2':
var teks = ` _*klik player gif to video 18+*_`  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/b6.mp4'), templateButtons: buttonsDefault9, footer: `̶ gua gangbang mak lu sini
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
			case prefix+'gangbang3':
var teks = ` _*klik player gif to video 18+*_`  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/b3.mp4'), templateButtons: buttonsDefault9, footer: `̶ gua gangbang mak lu sini
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
			case prefix+'colmek1':
var teks = ` _*klik player gif to video 18+*_`  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/b5.mp4'), templateButtons: buttonsDefault9, footer: `̶ uhhh sodok teros
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
			case prefix+'colmekvcs':
var teks = ` _*klik player gif to video 18+*_`  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/b4.mp4'), templateButtons: buttonsDefault9, footer: `̶ kalo vcs jangan di bisuin anj
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
			case prefix+'guy':
var teks = ` _*klik player gif to video 18+*_`  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./bokep/b7.mp4'), templateButtons: buttonsDefault9, footer: `̶ ahh yamatekudasoyyy
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
			
			
			case prefix+'sewa':
var teks = `➤ *GET BOT*
 ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
1 𝑴𝑰𝑵𝑮𝑮𝑼 : Rp.15,0000
1 𝑩𝑼𝑳𝑨𝑵 : Rp.20,000
 𝑷𝑬𝑹𝑴𝑨𝑵𝑬𝑵 : Rp.25,0000

➤ *JADI BOT*
1 𝑴𝑰𝑵𝑮𝑮𝑼 : Rp.25,0000
1 𝑩𝑼𝑳𝑨𝑵 : Rp.50,000
𝑷𝑬𝑹𝑴𝑨𝑵𝑬𝑵 : Rp.10,0000
𝑼𝑵𝑻𝑼𝑲 𝑴𝑵𝒀𝑬𝑾𝑨 𝑩𝑶𝑻 𝑾𝑯𝑨𝑻𝑺𝑨𝑷𝑷 → 𝑪𝑨𝑻𝒁𝒀 𝑩𝑶𝑻 𝑴𝑫
𝑺𝑰𝑳𝑨𝑯𝑲𝑨𝑵 𝑲𝑳𝑰𝑲 𝑩𝑼𝑻𝑻𝑶𝑵 𝑼𝑵𝑻𝑼𝑲 𝑵𝑬𝑿𝑻 𝑲𝑬 𝑶𝑾𝑵𝑬𝑹`
kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./media/ham.mp4'), templateButtons: buttonsDefault7, footer: `silahkan pc owner untuk melanjutkan 
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
case prefix+'rules':
			case prefix+'rules':
			    var teks = `𝐑𝐔𝐋𝐄𝐒
 ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
➤ 𝐓𝐨𝐥𝐨𝐧𝐠 𝐆𝐮𝐧𝐚𝐤𝐚𝐧, 𝐃𝐞𝐥𝐚𝐲 𝐉𝐚𝐧𝐠𝐚𝐧 𝐒𝐩𝐚𝐦 𝐒𝐚𝐚𝐭 𝐌𝐞𝐧𝐠𝐠𝐮𝐧𝐚𝐤𝐚𝐧 𝐁𝐨𝐭, 𝐌𝐞𝐧𝐭𝐚𝐧𝐠 𝐌𝐞𝐧𝐭𝐚𝐧𝐠 𝐆𝐫𝐚𝐭𝐢𝐬 𝐃𝐢𝐛𝐨𝐫𝐨𝐧𝐠 𝐬𝐞𝐦𝐮𝐚.

➤ 𝐂𝐚𝐥𝐥/𝐕𝐂 𝐁𝐨𝐭 𝐀𝐮𝐭𝐨 𝐁𝐥𝐨𝐜𝐤.

➤ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐂𝐚𝐥𝐥/𝐕𝐂 𝐁𝐨𝐭 𝐊𝐚𝐥𝐚𝐮 𝐓𝐢𝐝𝐚𝐤 𝐚𝐤𝐭𝐢𝐟.

➤ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐬𝐩𝐚𝐦 𝐛𝐨𝐭. 𝐒𝐚𝐧𝐤𝐬𝐢, 𝐖𝐀𝐑𝐍/𝐒𝐎𝐅𝐓 𝐁𝐋𝐎𝐂𝐊
     
➤ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐭𝐞𝐥𝐞𝐩𝐨𝐧 𝐛𝐨𝐭. 𝐒𝐚𝐧𝐤𝐬𝐢, 𝐒𝐎𝐅𝐓 𝐁𝐋𝐎𝐂𝐊
      
➤ 𝐉𝐚𝐧𝐠𝐚𝐧 𝐦𝐞𝐧𝐠𝐞𝐤𝐬𝐩𝐥𝐨𝐢𝐭𝐚𝐬𝐢 𝐛𝐨𝐭. 𝐒𝐚𝐧𝐤𝐬𝐢, 𝐏𝐄𝐑𝐌𝐀𝐍𝐄𝐍𝐓 𝐁𝐋𝐎𝐂𝐊

➤ 𝐁𝐨𝐭 𝐭𝐢𝐝𝐚𝐤 𝐚𝐤𝐭𝐢𝐟 𝟐𝟒 𝐣𝐚𝐦, 𝐣𝐚𝐝𝐢 𝐭𝐞𝐫𝐠𝐚𝐧𝐭𝐮𝐧𝐠 𝐤𝐚𝐥𝐚𝐮 𝐨𝐰𝐧𝐞𝐫𝐧𝐲𝐚 𝐥𝐚𝐠𝐢 𝐚𝐝𝐚 𝐰𝐚𝐤𝐭𝐮 𝐛𝐨𝐭𝐧𝐲𝐚 𝐣𝐮𝐠𝐚 𝐨𝐧.

➤ 𝐊𝐚𝐦𝐢 𝐭𝐢𝐝𝐚𝐤 𝐦𝐞𝐧𝐲𝐢𝐦𝐩𝐚𝐧 𝐠𝐚𝐦𝐛𝐚𝐫, 𝐯𝐢𝐝𝐞𝐨, 𝐟𝐢𝐥𝐞, 𝐚𝐮𝐝𝐢𝐨, 𝐝𝐚𝐧 𝐝𝐨𝐤𝐮𝐦𝐞𝐧 𝐲𝐚𝐧𝐠 𝐚𝐧𝐝𝐚 𝐤𝐢𝐫𝐢𝐦

➤ 𝐊𝐚𝐦𝐢 𝐭𝐢𝐝𝐚𝐤 𝐚𝐤𝐚𝐧 𝐩𝐞𝐫𝐧𝐚𝐡 𝐦𝐞𝐦𝐢𝐧𝐭𝐚 𝐚𝐧𝐝𝐚 𝐮𝐧𝐭𝐮𝐤 𝐦𝐞𝐦𝐛𝐞𝐫𝐢𝐤𝐚𝐧 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐬𝐢 𝐩𝐫𝐢𝐛𝐚𝐝𝐢

➤ 𝐉𝐢𝐤𝐚 𝐦𝐞𝐧𝐞𝐦𝐮𝐤𝐚𝐧 𝐁𝐮𝐠/𝐄𝐫𝐫𝐨𝐫 𝐬𝐢𝐥𝐚𝐡𝐤𝐚𝐧 𝐥𝐚𝐧𝐠𝐬𝐮𝐧𝐠 𝐥𝐚𝐩𝐨𝐫 𝐤𝐞 𝐎𝐰𝐧𝐞𝐫 𝐛𝐨𝐭

➤ 𝐀𝐩𝐚𝐩𝐮𝐧 𝐲𝐚𝐧𝐠 𝐚𝐧𝐝𝐚 𝐩𝐞𝐫𝐢𝐧𝐭𝐚𝐡 𝐩𝐚𝐝𝐚 𝐛𝐨𝐭 𝐢𝐧𝐢, 𝐊𝐀𝐌𝐈 𝐓𝐈𝐃𝐀𝐊 𝐀𝐊𝐀𝐍 𝐁𝐄𝐑𝐓𝐀𝐍𝐆𝐆𝐔𝐍𝐆 𝐉𝐀𝐖𝐀𝐁!

➤ 𝐊𝐨𝐧𝐬𝐞𝐤𝐮𝐞𝐧𝐬𝐢 𝐁𝐢𝐥𝐚 𝐌𝐞𝐥𝐚𝐧𝐠𝐠𝐚𝐫 𝐑𝐮𝐥𝐞𝐬, 𝐁𝐨𝐭 𝐀𝐤𝐚𝐧 𝐌𝐞𝐦𝐛𝐥𝐨𝐤𝐢𝐫 𝐊𝐚𝐦𝐮 𝐀𝐭𝐚𝐮 𝐌𝐞𝐧𝐠𝐞𝐥𝐮𝐚𝐫𝐤𝐚𝐧 𝐊𝐚𝐦𝐮 𝐃𝐚𝐫𝐢 𝐆𝐫𝐮𝐩`
kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./media/skhzyi.mp4'), templateButtons: buttonsDefault7, footer: `̶ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype: 'video/mp4', gifPlayback: true}) 
			break
case prefix+'bokepmenu':
var teks = `𝐩𝐨𝐫𝐧𝐨 𝐢𝐧𝐝𝐨𝐡𝐨𝐭 𝐱 𝐣𝐞𝐩𝐚𝐧𝐬𝐞

❍─ [ 𝐁𝐎𝐊𝐄𝐏 𝐌𝐄𝐍𝐔 ] ─❍ 
 
❒➥ .𝐯𝐢𝐫𝐚𝐥
❒➥ .𝐠𝐚𝐧𝐠𝐛𝐚𝐧𝐠𝟏
❒➥ .𝐠𝐚𝐧𝐠𝐛𝐚𝐧𝐠𝟐
❒➥ .𝐠𝐚𝐧𝐠𝐛𝐚𝐧𝐠𝟑
❒➥ .𝐜𝐨𝐥𝐦𝐞𝐤𝟏
❒➥ .𝐜𝐨𝐥𝐦𝐞𝐤𝐯𝐜𝐬
❒➥ .𝐠𝐮𝐲
`
			  
			    kahfzxy.sendMessage(from, { caption: teks, video: fs.readFileSync('./media/oh.mp4'), templateButtons: buttonsDefault8, footer: `̶silahkan pc owner untuk melanjutkan 
ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
⎙𝙲𝙰𝚃𝚉𝚈 𝙱𝙾𝚃 𝙼𝙳 → 𝙸𝚕𝚑𝚊𝚖 𝚜𝚔𝚑𝚢𝚣𝚒
`, mimetype:'video/mp4', gifPlayback: true}) 
			break
//-++++++++++++++textprome+++++++\\
case prefix+'pornhub': case prefix+'glitch': case prefix+'avenger': case prefix+'space': case prefix+'ninjalogo': case prefix+'marvelstudio': case prefix+'lionlogo': case prefix+'wolflogo': case prefix+'steel3d': case prefix+'wallgravity':
 reply (mess.wait)
 if (args.length < 2) return reply(`Example: ${command} LoL Human`)
var txt1 = args[1]
 var txt2 = args[2]
var buff = await getBuffer(`https://api.lolhuman.xyz/api/textprome2/${command.split(prefix)[1]}?apikey=AditAnjay&text1=${txt1}&text2=${txt2}`)
kahfzxy.sendMessage(from, { caption: `Nih Tod ${pushname}`,image: buff , templateButtons: buttonsDefault5, footer: 'TextProme catzy - bot', mentions: [sender] })
break
case prefix+'blackpink': case prefix+'neon': case prefix+'thunder':
        if (args.length < 2) return reply(`Example : ${command} BotWa`)
        var buffer = await getBuffer(`https://api.lolhuman.xyz/api/textprome/${command.split(prefix)[1]}?apikey=AditAnjay&text=${q}`)
         kahfzxy.sendMessage(from, { caption: `Nih Tod ${pushname}`,image: buffer , templateButtons: buttonsDefault5, footer: 'TextProme catzy - bot', mentions: [sender] })
         break
/*case prefix+'profile':
var tot = ` Hai ${pushname}`
fs.writeFileSync(`./imeg.jpg`, await (await fetch(setting.fla + pushname)).buffer())
			    kahfzxy.sendMessage(from, { caption: tot, location: { jpegThumbnail: fs.readFileSync('./imeg.jpg') }, templateButtons: buttonsDefault, footer: '© WhatsApp BOT', mentions: [sender] })
                            fs.unlinkSync('./imeg.jpg')
break*/
//Photo Oxxy
case prefix+'coffe': 
case prefix+'shadow':
reply (mess.wait)
 if (args.length < 2) return reply(`Example: ${prefix + command} LoL Human`)
var ini_txt = args.join(" ")
 var buff = await getBuffer(`https://api.lolhuman.xyz/api/photooxy1/${command.split(prefix)[1]}?apikey=AditAnjay&text=${ini_txt}`)
 kahfzxy.sendMessage(from, { caption: `Nih Tod ${pushname}`,image: buff , templateButtons: buttonsDefault5, footer: 'PhotoOxxy catzy - bot', mentions: [sender] })
         break
//Sound---\\
case prefix+'translate': case prefix+'tr': {
                if (!text) throw 'Masukkan Query Bahasa'
                let teks = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
                translate(teks, { to: args[0] }).then((res) => {
                    kahfzxy.sendText(from, `⭔ Input : ${quoted.text}\n\n⭔ Output : ${res.text}`, m)
                })
            }
            break
case prefix+'c':
						if (!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
                   if (!isBotGroupAdmins) return reply(mess.only.Badmin)
						reply(`Sukses menutup grup ${groupName}`)
						kahfzxy.groupSettingChange(from, GroupSettingChange.messageSend, true)
					break

case prefix+'eyesblue':
reply(mess.wait)
kahfzxy.sendMessage(from, { audio: {url:'https://a.uguu.se/aebbaEMg.mp3'}, mimetype: 'audio/mp4', ptt: false })
break
case prefix+'dimana-hatimu':
reply(mess.wait)
kahfzxy.sendMessage(from, { audio: {url: 'https://a.uguu.se/QrcptYqZ.mp3' }, mimetype: 'audio/mp4', ptt: false })
break
case prefix+'hargai-diriku':
reply(mess.wait)
kahfzxy.sendMessage(from, { audio: {url: 'https://a.uguu.se/LuBGPEed.mp3' }, mimetype: 'audio/mp4', ptt: false })
break
//--------Islam Feature--------\\
case prefix+'alquranaudio':
if (args.length < 2) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10`)
var surah = q[0]
var ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/quran/audio/${surah}?apikey=AditAnjay`)
kahfzxy.sendMessage(from, { audio: ini_buffer, mimetype: 'audio/mp4', ptt: true })
break
case prefix+'asmaulhusna':
var get_result = await fetchJson(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=AditAnjay`)
var get_result = get_result.result
var ini_txt = `No : ${get_result.index}\n`
ini_txt += `Latin: ${get_result.latin}\n`
ini_txt += `Arab : ${get_result.ar}\n`
ini_txt += `Indonesia : ${get_result.id}\n`
ini_txt += `English : ${get_result.en}`
kahfzxy.sendMessage(from, { caption: ini_txt, location: { jpegThumbnail: await getBuffer('https://a.uguu.se/KxjFgquJ.jpg')}, templateButtons: buttonsDefault3, footer: 'Asmaul Husna☄️', mentions: [sender] })
break

case prefix+'jadwalsholat':
if (args.length < 2) return reply(`Example: ${prefix + command} Yogyakarta`)
 var daerah = q
var get_result = await fetchJson(`https://api.lolhuman.xyz/api/sholat/${daerah}?apikey=AditAnjay`)
var get_result = get_result.result
var ini_txt = `Wilayah : ${get_result.wilayah}\n`
ini_txt += `Tanggal : ${get_result.tanggal}\n`
ini_txt += `Sahur : ${get_result.sahur}\n`
ini_txt += `Imsak : ${get_result.imsak}\n`
ini_txt += `Subuh : ${get_result.subuh}\n`
ini_txt += `Terbit : ${get_result.terbit}\n`
ini_txt += `Dhuha : ${get_result.dhuha}\n`
ini_txt += `Dzuhur : ${get_result.dzuhur}\n`
ini_txt += `Ashar : ${get_result.ashar}\n`
ini_txt += `Maghrib : ${get_result.maghrib}\n`
ini_txt += `Isya : ${get_result.isya}`
kahfzxy.sendMessage(from, { caption: ini_txt, location: { jpegThumbnail: await getBuffer('https://a.uguu.se/tRGrhTsg.jpg')}, templateButtons: buttonsDefault5, footer: 'JadwalSholat👳', mentions: [sender] })
break
case prefix+'kisahnabi':
if (args.length < 2 ) return reply(`Example: ${prefix + command} Muhammad`)
  var  query = args[1]
var get_result = await fetchJson(`https://api.lolhuman.xyz/api/kisahnabi/${query}?apikey=AditAnjay`)
var get_result = get_result.result
var ini_txt = `Name : ${get_result.name}\n`
ini_txt += `Lahir : ${get_result.thn_kelahiran}\n`
ini_txt += `Umur : ${get_result.age}\n`
ini_txt += `Tempat : ${get_result.place}\n`
ini_txt += `Story : \n${get_result.story}`
kahfzxy.sendMessage(from, { caption: ini_txt, location: { jpegThumbnail: await getBuffer('https://a.uguu.se/bSzqXOJn.jpg')}, templateButtons: buttonsDefault5, footer: 'Kisah Nabi🌚', mentions: [sender] })
break
			
case prefix+'cekprem':
            case prefix+'cekpremium':
                if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
                if (isOwner) return reply(`Lu owner bego!`)
                if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix+'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium) {
                    men.push(i.id)
                    txt += `*ID :* @${i.id.split("@")[0]}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                  }
                }
                mentions(txt, men, true)
                break
//--INFO FITUR----\\
case prefix+'infogempa':              
                var get_result = await fetchJson(`http://api.lolhuman.xyz/api/infogempa?apikey=AditAnjay`)
               var get_result = get_result.result
               var ini_txt = `Lokasi : ${get_result.lokasi}\n`
                ini_txt += `Waktu : ${get_result.waktu}\n`
                ini_txt += `Potensi : ${get_result.potensi}\n`
                ini_txt += `Magnitude : ${get_result.magnitude}\n`
                ini_txt += `Kedalaman : ${get_result.kedalaman}\n`
                ini_txt += `Koordinat : ${get_result.koordinat}`
                var get_buffer = await getBuffer(get_result.map)
                kahfzxy.sendMessage(from, { caption: ini_txt, image: get_buffer , templateButtons: buttonsDefault5, footer: 'Info Gempa 🌋', mentions: [sender] })
                break
case prefix+'coronaindo':


var ipnya = body.slice(16)

var inf = await fetchJson(`https://api.dapuhy.ga/api/others/corona?negara=indonesia&apikey=DappaAnjing`)

var buffer = await getBuffer(inf.result) 
var pesannya = `🐣Info Corona Indonesia🐣\n\n🐥Kasus : ${inf.kasus}\n\n🐥Meninggal : ${inf.meninggal}\n\n🐥Sembuh : ${inf.sembuh}`
kahfzxy.sendMessage(from, { caption: pesannya, location: { jpegThumbnail: await getBuffer('https://a.uguu.se/YXybPYDW.jpg')}, templateButtons: buttonsDefault5, footer: 'Corona Indonesia🇮🇩', mentions: [sender] })
break
case prefix+'coronaglobal':

var ipnya = body.slice(18)

var inf = await fetchJson(`https://api.lolhuman.xyz/api/corona/global?apikey=AditAnjay`)

var buffer = await getBuffer(inf.result)

var pesannya = `🐣Info Corona Global🐣\n\n🐣Positif : ${inf.result.positif}\n\n🐥Meninggal : ${inf.result.meninggal}\n\n🐥Sembuh : ${inf.result.sembuh}\n\n🐥Dirawat : ${inf.result.dirawat}`
kahfzxy.sendMessage(from, { caption: pesannya, location: { jpegThumbnail: await getBuffer('https://a.uguu.se/TLxrBVVg.jpg')}, templateButtons: buttonsDefault5, footer: 'Corona Global\n\nNote:\nSorry Corona Global Error Sembuh & Di Rawat!!', mentions: [sender] })
break
// Pendidikan Feature 
case prefix+'nulis-biasa':
case prefix+'tulis':
if (args.length < 2) return reply(`Yang Mau Di Tulis Apaan? Titit?\n\nExample:${command} KahfzXy`)
var teks = q
reply(mess.wait)
var nulis = encodeURIComponent(teks)
var res = await axios.get(`https://dt-04.herokuapp.com/nulis?text=${nulis}`)
if (res.data.error) return reply(res.data.error)
  var buff = Buffer.from(res.data.result.split(',')[1], 'base64')
kahfzxy.sendMessage(from, { caption: `Nih Kan Done ${pushname}`, image: buff , templateButtons: buttonsDefault5, footer: 'Nulis 📑', mentions: [sender] }).catch(e => {
  return reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim File_')
})
break
case prefix+'nuliskiri':
if (args.length < 2) return reply(`Yang Mau Di Tulis Apaan? Titit?\n\nExample:${command} KahfzXy`)
var teks = q
reply(mess.wait)
var s = await getBuffer(`https://hardianto.xyz/api/nuliskiri?text=${teks}&apikey=hardianto`)
	kahfzxy.sendMessage(from, { caption: `Nih Kan Done ${pushname}`, image: s , templateButtons: buttonsDefault5, footer: 'Nulis 📑', mentions: [sender] })
break      
case prefix+'nuliskanan':
if (args.length < 2) return reply(`Yang Mau Di Tulis Apaan? Titit?\n\nExample:${command} KahfzXy`)
var teks = q
reply(mess.wait)
var s = await getBuffer(`https://hardianto.xyz/api/nuliskanan?text=${teks}&apikey=hardianto`)
	kahfzxy.sendMessage(from, { caption: `Nih Kan Done ${pushname}`, image: s , templateButtons: buttonsDefault5, footer: 'Nulis 📑', mentions: [sender] })
break      
case prefix+'foliokiri':
if (args.length < 2) return reply(`Yang Mau Di Tulis Apaan? Titit?\n\nExample:${command} KahfzXy`)
var teks = q
reply(mess.wait)
var s = await getBuffer(`https://hardianto.xyz/api/foliokiri?text=${teks}&apikey=hardianto`)
	kahfzxy.sendMessage(from, { caption: `Nih Kan Done ${pushname}`, image: s , templateButtons: buttonsDefault5, footer: 'Nulis Folio 📑', mentions: [sender] })
break      
case prefix+'foliokanan':
if (args.length < 2) return reply(`Yang Mau Di Tulis Apaan? Titit?\n\nExample:${command} KahfzXy`)
var teks = q
reply(mess.wait)
var s = await getBuffer(`https://hardianto.xyz/api/foliokanan?text=${teks}&apikey=hardianto`)
	kahfzxy.sendMessage(from, { caption: `Nih Kan Done ${pushname}`, image: s , templateButtons: buttonsDefault5, footer: 'Nulis Folio 📑', mentions: [sender] })
break      
  // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    kahfzxy.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				    limitAdd(sender, limit)
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      kahfzxy.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				      limitAdd(sender, limit)
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
                break
			case prefix+'toimg': case prefix+'toimage':
			case prefix+'tovid': case prefix+'tovideo':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedSticker) return reply(`Reply stikernya!`)
			    var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
			    var buffer = Buffer.from([])
			    for await(const chunk of stream) {
			       buffer = Buffer.concat([buffer, chunk])
			    }
			    var rand1 = 'sticker/'+getRandom('.webp')
			    var rand2 = 'sticker/'+getRandom('.png')
			    fs.writeFileSync(`./${rand1}`, buffer)
			    if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
			    exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
			      fs.unlinkSync(`./${rand1}`)
			      if (err) return reply(mess.error.api)
			      kahfzxy.sendMessage(from, { image: { url: `./${rand2}` }}, { quoted: msg })
			      limitAdd(sender, limit)
				  fs.unlinkSync(`./${rand2}`)
			    })
			    } else {
			    reply(mess.wait)
		          webp2mp4File(`./${rand1}`).then( data => {
			       fs.unlinkSync(`./${rand1}`)
			       kahfzxy.sendMessage(from, { video: { url: data.result }}, { quoted: msg })
			       limitAdd(sender, limit)
				  })
			    }
			    break
	        // Downloader Menu
const hq = {
                         "key": {
                         "remoteJid": "6288222079999-1633244783@g.us", 
                         "participant": '6285793887010@s.whatsapp.net'
                    }, 
                         "message": {
                         "orderMessage": {
                         "itemCount": 2021, 
                         "status": 200, 
                         
                         "surface": 200, 
                         "message": `Halo ${pushname}! dapet salam dari owner.`, 
                         "orderTitle": 'catzy - bot ./ilham - skhyzi', 
                         "sellerJid": '628126218860i@s.whatsapp.net'
                    } 
                          } 
                              } 
			case prefix+'tiktok':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Tiktok(args[1]).then( data => {
			      kahfzxy.sendMessage(from, {
				   video: { url: data.medias[0].url },
				   caption: `${data.title}\n\nKamu bisa mengubahnya menjadi Vidio Tanpa Watermark atau Audio, pencet tombol dibawah untuk mengubahnya!`,
				   buttons: [{buttonId: `${prefix}tiktoknowm ${args[1]}`, buttonText: { displayText: "Without Watermark" }, type: 1 },
					{buttonId: `${prefix}tiktokaudio ${args[1]}`, buttonText: { displayText: "Audio" }, type: 1 }],
				   footer: "catzy - bot md ./ilham skhyzi"
			      }, { quoted: msg })
				  limitAdd(sender, limit)
			    }).catch(() => reply(mess.error.api))
			    break
			    
			case prefix+'tiktoknowm':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hxz.ttdownloader(args[1]).then( data => {
			      kahfzxy.sendMessage(from, { video: { url: data.nowm }}, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'tiktokaudio':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    hxz.ttdownloader(args[1]).then( data => {
			      kahfzxy.sendMessage(from, { audio: { url: data.nowm }, mimetype: 'audio/mp4' }, { quoted: msg })
			       limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
		        break
            case prefix+'play':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                reply(mess.wait)
                await sendPlay(from, q)
				limitAdd(sender, limit)
                break
			case prefix+'ytmp4': case prefix+'mp4':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Youtube(args[1]).then( data => {
			      var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[1].quality}\n*≻ Size :* ${data.medias[1].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      kahfzxy.sendMessage(from, { video: { url: data.medias[1].url }, caption: teks }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'ytmp3': case prefix+'mp3':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Youtube(args[1]).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      kahfzxy.sendMessage(from, { image: { url: data.thumbnail }, caption: teks }, { quoted: msg })
			      kahfzxy.sendMessage(from, { audio: { url: data.medias[7].url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: troli })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'getvideo': case prefix+'getvidio':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    xfar.Youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[1].quality}\n*≻ Size :* ${data.medias[1].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      kahfzxy.sendMessage(from, { video: { url: data.medias[1].url }, caption: teks }, { quoted: msg })
			       limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
		        break
			case prefix+'getmusik': case prefix+'getmusic':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    xfar.Youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      kahfzxy.sendMessage(from, { image: { url: data.thumbnail }, caption: teks }, { quoted: msg })
			      kahfzxy.sendMessage(from, { document: { url: data.medias[7].url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'igdl': case prefix+'instagram': case prefix+'ig':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Instagram(args[1]).then( data => {
			     var teks = `*Instagram Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Jumlah Media :* ${data.medias.length}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			     reply(teks)
			     for (let i of data.medias) {
				  if (i.extension === "mp4") {
				   kahfzxy.sendMessage(from, { video: { url: i.url }})
				  } else if (i.extension === "jpg") {
				   kahfzxy.sendMessage(from, { image: { url: i.url }})
			      }
			     }
				 limitAdd(sender, limit)
			    }).catch(() => reply(mess.error.api))
			    break
			case prefix+'facebook': case prefix+'fbdl':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('facebook.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Facebook(args[1]).then( data => {
			      kahfzxy.sendMessage(from, { video: { url: data.medias[0].url }, caption: data.title }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			// Owner Menu
			case prefix+'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				break
			case prefix+'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				kahfzxy.groupLeave(from)
			    break
			case prefix+'join':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await kahfzxy.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
			case prefix+'setpp': case prefix+'setppbot':
		        if (!isOwner) return reply(mess.OnlyOwner)
		        if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
				  var data =  await kahfzxy.updateProfilePicture(botNumber, { url: media })
			      fs.unlinkSync(media)
				  reply(`Sukses`)
				} else {
				  reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
				}
				break
			case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (!args[2]) return reply(`Mau yang berapa hari?`)
                if (mentioned.length !== 0) {
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    reply('Sukses')
                } else {
                 var cekap = await kahfzxy.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0){
                    premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                } else {
                 var cekpr = await kahfzxy.oWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    reply('Sukses!')
                }
                break
			// Random Menu
			case prefix+'quote': case prefix+'quotes':
			case prefix+'randomquote': case prefix+'randomquotes':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				var data = await fetchJson(`https://megayaa.herokuapp.com/api/randomquote`)
			    reply(data.result.quotes+'\n\n-- '+data.result.author)
				limitAdd(sender, limit)
				break
			case prefix+'cecan': case prefix+'cewek':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
			    var query = ["cecan hd","cecan indo","cewe cantik", "cewe aesthetic", "cecan aesthetic"]
                var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `${command}`, buttonText: { displayText: "Next Photo" }, type: 1 }]
				kahfzxy.sendMessage(from, { caption: "Random Cewe Cantik", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: troli })
			    limitAdd(sender, limit)
 			    break
			case prefix+'cogan': case prefix+'cowok':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				reply(mess.wait)
				var query = ["cogan hd","cogan indo","cowo ganteng","handsome boy","hot boy","oppa","cowo aesthetic","cogan aesthetic"]
				var data = await pinterest(pickRandom(query))
				var but = [{buttonId: `${command}`, buttonText: { displayText: "Next Photo" }, type: 1 }]
				kahfzxy.sendMessage(from, { caption: "Random Cowo Ganteng", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: troli })
			    limitAdd(sender, limit)
				break
			// Search Menu
			case prefix+'lirik': case 'liriklagu':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} judul lagu`)
				reply(mess.wait)
			    ra.Musikmatch(q).then(async(data) => {
				  var teks = `*${data.result.judul} - ${data.result.penyanyi}*\n\n${data.result.lirik}`
				  kahfzxy.sendMessage(from, { image: { url: data.result.thumb }, caption: teks }, { quoted: troli })
				}).catch(() => reply(`Judul lagu tidak ditemukan`))
				limitAdd(sender, limit)
				break
			case prefix+'grupwa': case prefix+'searchgrup':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} nama grup`)
				reply(mess.wait)
			    hxz.linkwa(q).then(async(data) => {
				  if (data.length == 0) return reply(`Grup ${q} tidak ditemukan`)
				  var teks = `*Hasil Pencarian Dari ${q}*\n\n`
				  for (let x of data) {
					teks += `*Nama :* ${x.nama}\n*Link :* ${x.link}\n\n`
				  }

				  reply(teks)
				  limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'pinterest':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`)
				reply(mess.wait)
			    var jumlah;
			    if (q.includes('--')) jumlah = q.split('--')[1]
			    pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
				  if (q.includes('--')) {
					if (data.result.length < jumlah) {
					  jumlah = data.result.length
					  reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
					}
					for (let i = 0; i < jumlah; i++) {
					  kahfzxy.sendMessage(from, { image: { url: data.result[i] }})
					}
				    limitAdd(sender, limit)
				  } else {
					var but = [{buttonId: `${command} ${q}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
					kahfzxy.sendMessage(from, { caption: `Hasil pencarian dari ${q}`, image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: troli })
				    limitAdd(sender, limit)
				  }
				})
			    break
			case prefix+'yts': case prefix+'ytsearch':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
				reply(mess.wait)
			    yts(q).then( data => {
				  let yt = data.videos
				  var jumlah = 15
				  if (yt.length < jumlah) jumlah = yt.length
				  var no = 0
				  let txt = `*YOUTUBE SEARCH*

 *Data berhasil didapatkan*
 *Hasil pencarian dari ${q}*
 
 *${prefix}getmusic <no urutan>*
 *${prefix}getvideo <no urutan>*
 Untuk mengambil Audio/Video dari hasil pencarian`
                for (let i = 0; i < jumlah; i++) {
				  no += 1
				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
				}
				kahfzxy.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: msg })
				limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			// Game Menu
			case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
                if (!isGroup)return reply(mess.OnlyGrup)
			    if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (mentionByTag.length !== 1) {
				if (mentionByTag[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                if (mentionByTag[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                     var hadiah = randomNomor(100, 150)
				     mentions(monospace(`@${sender.split('@')[0]} menantang @${mentionByTag[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentionByTag[0]], false)
                     tictactoe.push({
                        id: from,
                        status: null,
						hadiah: hadiah,
                        penantang: sender,
                        ditantang: mentionByTag[0],
                        TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                     })
					 gameAdd(sender, limit)
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
			case prefix+'delttt':
            case prefix+'delttc':
                if (!isGroup)return reply(mess.OnlyGrup)
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                var posi = getPosTic(from, tictactoe)
                if (tictactoe[posi].penantang.includes(sender)) {
                    tictactoe.splice(posi, 1)
                    reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (tictactoe[posi].ditantang.includes(sender)) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isGroupAdmins) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isOwner) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else {
                   reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
                }
                break
			case prefix+'tebakgambar':
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakgambar)) return kahfzxy.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
				kotz.tebakgambar().then( data => {
				  data = data[0]
				  data.jawaban = data.jawaban.split('Jawaban ').join('')
				  var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  kahfzxy.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: troli })
				  .then( res => {
					var jawab = data.jawaban.toLowerCase()
					addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
					gameAdd(sender, glimit)
				  })
				})
			    break
			// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await kahfzxy.groupInviteCode(from).catch(() => reply(mess.error.api))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setppgrup': case prefix+'setppgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (isImage || isQuotedImage) {
				  var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
			      await kahfzxy.updateProfilePicture(from, { url: media })
				  .then( res => {
					reply(`Sukses`)
					fs.unlinkSync(media)
				  }).catch(() => reply(mess.error.api))
				} else {
			      reply(`Kirim/balas gambar dengan caption ${command}`)
				}
				break
			case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await kahfzxy.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await kahfzxy.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'group': case prefix+'grup':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				if (args[1] == "close") {
				  kahfzxy.groupSettingUpdate(from, 'announcement')
				  reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
				} else if (args[1] == "open") {
				  kahfzxy.groupSettingUpdate(from, 'not_announcement')
				  reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
				} else {
				  reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
				}
			    break
			case prefix+'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins) return reply(mess.GrupAdmin)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				await kahfzxy.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply(mess.error.api))
				break
			case prefix+'hidetag': case prefix+'h':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				kahfzxy.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
			// Bank & Payment Menu
			case prefix+'topbalance':{
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                let arrTop = []
				var total = 10
				if (balance.length < 10) total = balance.length
                for (let i = 0; i < total; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
                break
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, parseInt(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
			case prefix+'transfer':
            case prefix+'tf':{
                 if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @6285791458996 2000`)
                 if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
                 if (!args[2]) return reply(`Masukkan nominal nya!`)
                 if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
                 if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                 if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
                 var anu = getBalance(sender, balance)
                 if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
                 kurangBalance(sender, parseInt(args[2]), balance)
                 addBalance(mentioned[0], parseInt(args[2]), balance)
                 reply(`Sukses transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`)
            }
                 break
            case prefix+'buygamelimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, parseInt(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
			case prefix+'limit': case prefix+'balance':
			case prefix+'ceklimit': case prefix+'cekbalance':
			    if (mentioned.length !== 0){
					var Ystatus = ownerNumber.includes(mentioned[0])
					var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
				    var ggcount = isPrim ? gcounti.prem : gcounti.user
                    var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
                    textImg(`Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount}\nLimit Game : ${cekGLimit(mentioned[0], ggcount, glimit)}/${ggcount}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                } else {
                    var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                    textImg(`Limit : ${isPremium ? 'Unlimited' : limitPrib}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                }
				break
			default:
			if (!isGroup && isCmd) {
				reply(`Pak iye Wa Qomar Bagus te`)
			}
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
