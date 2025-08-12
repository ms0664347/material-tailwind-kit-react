import { useEffect, useState } from "react";
import { getBgData } from "./s3get";

export function TopContainer() {
    const [images, setImages] = useState([]); // [{src, name}]
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const s3BaseUrl = "https://pigxuan-db.s3.ap-northeast-1.amazonaws.com";

    useEffect(() => {
        (async () => {
            try {
                const bg = await getBgData(); // [{ image: "/img/xxx.jpg" }, ...]
                const imgs = bg.map(item => ({
                    src: s3BaseUrl + item.image,
                    name: item.image,
                }));
                setImages(imgs);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (!images.length) return;
        const id = setInterval(
            () => setCurrentIndex(i => (i + 1) % images.length),
            5000
        );
        return () => clearInterval(id);
    }, [images.length]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>載入失敗: {error.message}</div>;

    return (
        <div className="relative mt-4 h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img.src}
                    alt={`背景圖 ${ index }`}
                    className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${ index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0' }`}
                />
            ))}

            {/* 左右箭頭 */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={() =>
                            setCurrentIndex(i => (i - 1 + images.length) % images.length)
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full z-20"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() =>
                            setCurrentIndex(i => (i + 1) % images.length)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full z-20"
                    >
                        ›
                    </button>
                </>
            )}

            {/* dot */}
            {images.length > 1 && (
                <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 z-20">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${ currentIndex === idx ? "bg-white" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TopContainer;
