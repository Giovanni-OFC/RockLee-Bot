let handler = async (m, { conn, usedPrefix, isOwner }) => {
m.react('🫅')

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:𝐑𝐨𝐜𝐤𝐋𝐞𝐞 💥\nFN:𝐑𝐨𝐜𝐤𝐋𝐞𝐞 💥\nORG:𝐑𝐨𝐜𝐤𝐋𝐞𝐞 💥\nTITLE:\nitem1.TEL;waid=56986511915:56986511915\nitem1.X-ABLabel:𝐑𝐨𝐜𝐤𝐋𝐞𝐞 💥\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:𝐑𝐨𝐜𝐤𝐋𝐞𝐞 💥\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '𝐑𝐨𝐜𝐤𝐋𝐞𝐞 💥', contacts: [{ vcard }] }}, {quoted: fkontak})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador/a', 'dueño/a'] 

export default handler