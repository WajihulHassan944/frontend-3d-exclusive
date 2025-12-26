
export const getVimeoEmbedUrl = (url) => {
  if (!url) return null;

  const urlObj = new URL(url);

  const videoId = urlObj.pathname.split('/').pop();
  const hValue = urlObj.searchParams.get("h");

  return `https://player.vimeo.com/video/${videoId}?h=${hValue}&autoplay=1&loop=1&autopause=0&muted=1&background=1`;
};
