export type Media = "VIDEO" | "IMAGE"

export type MediaCard = {
    media: Media, 
    url: string,
}

type Props = {
    mediaCard : MediaCard;
}

export default function MediaCard({mediaCard} : Props) {
    return (
        <>
        <div className="p-8">
            {
                (mediaCard.media === "VIDEO") ?
                    <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=${mediaCard.url}`}
                        style={{ border: "none", overflow: "hidden" }}
                        width="50%"
                        height="50%"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        className="w-1/2 h-1/2" 
                    ></iframe>
                :
                    <iframe 
                        src={`https://www.facebook.com/plugins/post.php?href=${mediaCard}`}
                        width="50%"
                        height="50%"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
            }
        </div>
        </>
    );
}