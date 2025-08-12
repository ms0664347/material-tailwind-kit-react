import PropTypes from "prop-types";
import { Card, Avatar, Typography } from "@material-tailwind/react";
import '@fortawesome/fontawesome-free/css/all.min.css';


export function ProjectCard({ img, name, hashtag, socials, description }) {
  const s3BaseUrl = "https://pigxuan-db.s3.ap-northeast-1.amazonaws.com";
  return (
    <div className="shadow-lg shadow-gray-400/50 rounded-2xl bg-white p-4">
      <Card color="transparent" shadow={false} className="text-center">
        <div className="w-full w-full h-[150px] md:h-[220px] lg:h-[300px] overflow-hidden rounded-lg">
          <Avatar
            src={img ? `${ s3BaseUrl }${ img }` : '/placeholder.jpg'}
            alt={name}
            size="xxl"
            variant="rounded"
            className="h-full w-full object-contain shadow-lg shadow-gray-500/25"
          />
        </div>
        <Typography variant="h5" color="blue-gray" className="mt-6 mb-1">
          {name}
        </Typography>
        {hashtag && hashtag.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {hashtag.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-gray-50 text-blue-gray-500 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div className="h-6">{/* 空白佔位，避免跳動 */}</div>
        )}

        {/* 描述，手機2行，桌面3行 */}
        {description && (
          <div
            className="
              mt-3 px-2 
              text-sm text-blue-gray-400 leading-relaxed 
              min-h-[40px] sm:min-h-[50px] md:min-h-[70px] 
              max-h-[60px] sm:max-h-[80px] md:max-h-[100px] 
              overflow-hidden
            "
          >
            <p className="line-clamp-2 md:line-clamp-3">{description}</p>
          </div>
        )}

        {socials && <div className="mx-auto mt-5">{socials}</div>}
      </Card>
    </div>
  );
}

ProjectCard.defaultProps = {
  hashtag: "",
  socials: null,
  description: "",
};

ProjectCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hashtag: PropTypes.node,
  socials: PropTypes.node,
  description: PropTypes.string,
};

ProjectCard.displayName = "/src/widgets/layout/project-card.jsx";

export default ProjectCard;
