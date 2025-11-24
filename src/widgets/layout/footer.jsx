import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";
import { getProfileData } from "../../pages/s3get";
import { useEffect, useState } from "react";
const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {

    const [profile, setProfile] = useState(null);
    // 取得今天日期（格式 yyyy-MM-dd）
    const today = new Date().toLocaleDateString("zh-TW");

    useEffect(() => {
        getProfileData()
            .then((profileData) => {
                setProfile(profileData);
            })
            .catch(err => setError(err))
    }, []);

    return (
        <div className="bg-white">
            <footer className="relative px-4 pt-8 pb-6">
                <div className="container mx-auto">
                    <div className="flex flex-wrap pt-6 text-center lg:text-left">
                        <div className="w-full px-4 lg:w-6/12">
                            <Typography variant="h4" className="mb-4" color="blue-gray">
                                {title}
                            </Typography>
                            <Typography className="font-normal text-blue-gray-500 lg:w-2/5">
                                {description}
                            </Typography>
                            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
                                {socials.map(({ color, name, path }) => (
                                    <a
                                        key={name}
                                        href={path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                                            <Typography color={color}>
                                                <i className={`fa-brands fa-${ name }`} />
                                            </Typography>
                                        </IconButton>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
                            {menus.map(({ name, items }) => (
                                <div key={name}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-2 block font-medium uppercase"
                                    >
                                        {name}
                                    </Typography>
                                    <ul className="mt-3">
                                        {items.map((item) => (
                                            <li key={item.name}>
                                                <Typography
                                                    as="a"
                                                    href={item.path}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    variant="small"
                                                    className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                                                >
                                                    {item.name}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap items-center justify-center md:justify-between">
                        <div className="mx-auto w-full px-4 text-center">
                            <Typography
                                className="text-[1.5rem] font-bold text-blue-gray-500 text-center"
                            >
                                Contact Us
                            </Typography>

                            {profile?.socials?.map(({ color, name, url }) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mx-[10px] md:mx-[25px]"
                                    style={{ alignItems: "center" }}
                                >

                                    <IconButton
                                        color={color}
                                        variant="text"
                                    >
                                        <i
                                            className={`fa-brands text-xl fa-${ name }`}
                                            style={{
                                                fontSize: "2rem",  // 圖示變大
                                            }}
                                        />
                                    </IconButton>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                {/* ⭐ 固定在右下角的 Gmail icon */}
                <div
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 9999,
                        background: "#ffffffcc",
                        padding: "12px",
                        borderRadius: "50%",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        cursor: "pointer",          // <-- 滑鼠變手指
                    }}
                    onClick={() => {
                        const email = "kitty88092081@gmail.com, a0917379137@gmail.com";   // 換成你的收信 Email
                        const subject = encodeURIComponent(`${ today } 合作洽詢`);
                        const body = encodeURIComponent("你好，我想與你聯絡關於...");

                        const gmailURL =
                            `https://mail.google.com/mail/?view=cm&fs=1&to=${ email }&su=${ subject }&body=${ body }`;

                        window.open(gmailURL, "_blank");       // <-- 開新分頁
                    }}
                >
                    <i
                        className="fa-solid fa-envelope"
                        style={{
                            fontSize: "2rem",
                            color: "#353eeaff",
                        }}
                    />
                </div>
            </footer>
        </div>
    );
}

Footer.defaultProps = {
    title: "",
    description:
        "",
    socials: [
        // {
        //   color: "gray",
        //   name: "twitter",
        //   path: "https://www.twitter.com/creativetim",
        // },
        // {
        //   color: "gray",
        //   name: "youtube",
        //   path: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
        // },
        // {
        //   color: "gray",
        //   name: "instagram",
        //   path: "https://www.instagram.com/creativetimofficial/",
        // },
        // {
        //   color: "black",
        //   name: "github",
        //   path: "https://github.com/creativetimofficial/material-tailwind",
        // },
    ],
    menus: [
        // {
        //   name: "useful links",
        //   items: [
        //     { name: "About Us", path: "https://www.creative-tim.com/presentation" },
        //     { name: "Blog", path: "https://www.creative-tim.com/blog" },
        //     {
        //       name: "Github",
        //       path: "https://www.github.com/creativetimofficial/material-tailwind?ref=mtk",
        //     },
        //     {
        //       name: "Free Products",
        //       path: "https://www.creative-tim.com/templates/free?ref=mtk",
        //     },
        //   ],
        // },
        // {
        //   name: "other resources",
        //   items: [
        //     {
        //       name: "MIT License",
        //       path: "https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtk",
        //     },
        //     {
        //       name: "Contribute",
        //       path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtk",
        //     },
        //     {
        //       name: "Change Log",
        //       path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CHANGELOG.md?ref=mtk",
        //     },
        //     {
        //       name: "Contact Us",
        //       path: "https://creative-tim.com/contact-us?ref=mtk",
        //     },
        //   ],
        // },
    ],
    copyright: (
        <>
            Copyright © {year} Material Tailwind by{" "}
            <a
                href="https://www.creative-tim.com?ref=mtk"
                target="_blank"
                className="text-blue-gray-500 transition-colors hover:text-blue-500"
            >
                Creative Tim
            </a>
            .
        </>
    ),
};

Footer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    socials: PropTypes.arrayOf(PropTypes.object),
    menus: PropTypes.arrayOf(PropTypes.object),
    copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
