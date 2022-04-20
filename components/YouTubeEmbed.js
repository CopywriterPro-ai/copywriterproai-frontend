import { useState } from "react";

const YouTubeEmbed = (props) => {
  const [preconnected, setPreconnected] = useState(false);
  const [iframe, setIframe] = useState(false);
  const videoId = encodeURIComponent(props.id);
  const videoPlaylisCovertId =
    typeof props.playlistCoverId === "string"
      ? encodeURIComponent(props.playlistCoverId)
      : null;
  const videoTitle = props.title;
  const posterImp = props.poster || "hqdefault";
  const paramsImp = `&${props.params}` || "";
  const mutedImp = props.muted ? "&mute=1" : "";
  const announceWatch = props.announce || "Watch";
  const format = props.webp ? "webp" : "jpg";
  const vi = props.webp ? "vi_webp" : "vi";
  const posterUrl =
    props.thumbnail ||
    (!props.playlist
      ? `https://i.ytimg.com/${vi}/${videoId}/${posterImp}.${format}`
      : `https://i.ytimg.com/${vi}/${videoPlaylisCovertId}/${posterImp}.${format}`);

  let ytUrl = props.noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  ytUrl = props.cookie
    ? "https://www.youtube.com"
    : "https://www.youtube-nocookie.com";

  const iframeSrc = !props.playlist
    ? `${ytUrl}/embed/${videoId}?autoplay=1&state=1${mutedImp}${paramsImp}`
    : `${ytUrl}/embed/videoseries?autoplay=1${mutedImp}&list=${videoId}${paramsImp}`;

  const activatedClassImp = props.activatedClass || "yt-embed-activated";
  const adNetworkImp = props.adNetwork || false;
  const aspectHeight = props.aspectHeight || 9;
  const aspectWidth = props.aspectWidth || 16;
  const iframeClassImp = props.iframeClass || "";
  const playerClassImp = props.playerClass || "yt-embed-pbtn";
  const wrapperClassImp = props.wrapperClass || "yt-embed";
  const onIframeAdded = props.onIframeAdded || function () {};

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };

  const addIframe = () => {
    if (iframe) return;
    onIframeAdded();
    setIframe(true);
  };

  return (
    <>
      <link rel="preload" href={posterUrl} as="image" />
      <>
        {preconnected && (
          <>
            <link rel="preconnect" href={ytUrl} />
            <link rel="preconnect" href="https://www.google.com" />
            {adNetworkImp && (
              <>
                <link rel="preconnect" href="https://static.doubleclick.net" />
                <link
                  rel="preconnect"
                  href="https://googleads.g.doubleclick.net"
                />
              </>
            )}
          </>
        )}
      </>
      <article
        onPointerOver={warmConnections}
        onClick={addIframe}
        className={`${wrapperClassImp} ${iframe ? activatedClassImp : ""}`}
        data-title={videoTitle}
        style={{
          backgroundImage: `url(${posterUrl})`,
          ...{
            "--aspect-ratio": `${(aspectHeight / aspectWidth) * 100}%`,
          },
        }}
      >
        <button
          className={playerClassImp}
          aria-label={`${announceWatch} ${videoTitle}`}
        />
        {iframe && (
          <iframe
            className={iframeClassImp}
            title={videoTitle}
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSrc}
          ></iframe>
        )}
      </article>
    </>
  );
};

export default YouTubeEmbed;
