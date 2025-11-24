import React from "react";
import { Typography } from "@material-tailwind/react";

export default function lightbox({ project, onClose }) {
    if (!project) return null; // 沒有圖片就不渲染
    const images = Array.isArray(project.img) ? project.img : [project.img];
    const s3BaseUrl = "https://pigxuan-db.s3.ap-northeast-1.amazonaws.com";
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="
                    flex flex-col 
                    w-full h-full
                    max-w-none max-h-none
                    sm:w-[90vw] sm:h-[90vh]
                    md:w-[85vw] md:h-[85vh]
                    overflow-y-auto 
                    overflow-hidden   /* 新增這行 */
                    p-0 sm:p-8 
                    bg-white 
                    sm:rounded-lg rounded-none
                "
                onClick={(e) => {
                    if (window.innerWidth >= 640) {
                        // 只有螢幕寬度 >= 640px（即非手機）才阻止事件冒泡
                        e.stopPropagation();
                    }
                }}
            >

                {/* 圖片（直向排列） */}
                <div className="flex flex-col gap-3 items-center">
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src ? `${ s3BaseUrl }${ src }` : '/placeholder.jpg'}
                            alt={`Lightbox-${ i }`}
                            className="
                                rounded shadow 
                                object-contain
                                mt-4
                                md:mt-4
                                lg:mt-8
                                min-w-[400px] min-h-auto
                                md:min-w-[70vw] md:min-h-auto
                                lg:min-w-[50vw] lg:min-h-auto
                                max-w-[400px] min-h-auto
                                md:max-w-[70vw] md:max-h-[70vw]
                                lg:max-w-[50vw] lg:max-h-[35vw]
                                shadow-2xl
                                drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]

                            "
                        />
                    ))}
                </div>

                {/* Description 固定在白色框底部 */}
                {project.description && (
                    <div className=" w-[80vw] md:w-[50vw] h-auto mt-12 mx-auto flex justify-center items-center text-center text-gray-800 text-lg bg-gray-100 p-3 rounded">
                        <Typography variant="paragraph" color="blue-gray">
                            {project.description}
                        </Typography>
                    </div>

                )}

                {/* 返回按鈕 */}
                <div className="w-full flex justify-center mt-6 mb-6">
                    <button
                        className="
                            px-6 py-2 
                            bg-black         /* 黑底 */
                            text-white       /* 白字 */
                            rounded-lg 
                            shadow-md 
                            hover:bg-gray-800 
                            active:bg-gray-900
                            transition
                        "
                        onClick={onClose}
                    >
                        返回
                    </button>

                </div>
            </div>
        </div>
    );
}
