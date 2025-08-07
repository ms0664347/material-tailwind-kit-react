import React from "react";
import { Typography } from "@material-tailwind/react";

export default function lightbox({ project, onClose }) {
    if (!project) return null; // 沒有圖片就不渲染
    const images = Array.isArray(project.img) ? project.img : [project.img];
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
                <div className="flex flex-col gap-6 items-center">
                    {images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Lightbox-${ i }`}
                            className="
                                rounded shadow 
                                object-contain
                                mt-12
                                md:mt-4
                                lg:mt-8
                                min-w-[400px] min-h-auto
                                md:min-w-[70vw] md:min-h-auto
                                lg:min-w-[50vw] lg:min-h-auto
                                max-w-[400px] min-h-auto
                                md:max-w-[70vw] min-h-auto
                                lg:max-w-[50vw] min-h-auto
                                shadow-2xl
                                drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]
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
            </div>
        </div>
    );
}
