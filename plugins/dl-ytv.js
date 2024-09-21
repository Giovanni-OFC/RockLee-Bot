import axios from "axios";
import yts from "yt-search";

const getVideoId = (url) => {
  const videoIdPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|[^v\r\n\s]+?\/|user\/[^\/\n\s]+|embed\/|videoseries\?list=)|(?:youtu\.)?be(?:\.com)?\/(?:watch\?v=|v\/|u\/\w\/|embed\/|watch\?v%3Dd%2026|watch\?v-|-+|watch\/|-+|v=)?)((\w|-){11}).*/;
  const match = url.match(videoIdPattern);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

const Ytdl = {
  mp4: async (url) => {
    try {
      const videoId = getVideoId(url);
      const videoUrl = (await yts(videoId)).videos[0].url;

      const { data: mediaData } = await axios.post("https://api.cobalt.tools/api/json", {
        url: videoUrl,
        filenamePattern: "basic",
        resolution: "480p",  // Resolución 480p
      }, {
        headers: {
          Accept: "application/json",
          origin: "https://cobalt.tools",
          referer: "https://cobalt.tools/",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/128.0.0.0 Safari/537.36",
        }
      });

      const videoData = (await yts("https://youtu.be/" + videoId)).videos[0];
      const authorData = (await yts(videoData.author.name)).channels[0];

      return {
        status: true,
        msg: "Se descargó con éxito!",
        title: videoData.title,
        metadata: {
          id: videoData.videoId,
          duration: videoData.timestamp,
          thumbnail: videoData.image,
          views: formatNumber(videoData.views),
          description: videoData.description,
        },
        author: {
          name: authorData.name,
          url: authorData.url,
          bio: authorData.about,
          avatar: authorData.image,
          subscriber: formatNumber(authorData.subCount),
        },
        url: "https://youtu.be/" + videoId,
        media: mediaData.url,
      };
    } catch (error) {
      return {
        status: false,
        msg: "Error al obtener la data!",
        err: error.message,
      };
    }
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) throw `Ingresa el link de YouTube!\nEjemplo: ${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ`;
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

  const result = await Ytdl.mp4(text);

  if (result.status) {
    let caption = `
*Titulo:* ${result.title}
*Duración:* ${result.metadata.duration}
*Vistas:* ${result.metadata.views}
*Descripción:* ${result.metadata.description}
*Autor:* ${result.author.name} (${result.author.subscriber} subs)
*Link:* ${result.url}
`;
    await conn.sendFile(m.chat, result.media, 'video.mp4', caption, m);
  } else {
    throw result.msg;
  }
};

handler.help = ["ytmp4"];
handler.tags = ["downloader"];
handler.command = /^(ytmp4|ytvideo)$/i;

export default handler;