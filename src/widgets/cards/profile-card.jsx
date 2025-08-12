import PropTypes from "prop-types";
import { Card, Avatar, Typography } from "@material-tailwind/react";

export function ProfileCard({ img, name, title, socials, description }) {
  const s3BaseUrl = "https://pigxuan-db.s3.ap-northeast-1.amazonaws.com";
  return (
    <Card color="transparent" shadow={false} className="text-center">
      <div className="relative bg-white flex items-center justify-center h-full w-full md:min-w-[200px] md:min-h-[200px] rounded-lg shadow-lg shadow-gray-400/60">
        <Avatar
          src={img ? `${ s3BaseUrl }${ img }` : '/placeholder.jpg'}
          alt={name}
          size="xxl"
          variant="rounded"
          className="h-full w-full object-contain"
        />
      </div>


      <Typography variant="h5" color="blue-gray" className="mt-6 mb-1">
        {name}
      </Typography>
      {title && (
        // <Typography className="font-bold text-blue-gray-500">
        //   {title}
        // </Typography>
        <Typography className="mt-3 text-lg text-blue-gray-700 leading-relaxed px-2 min-h-[30px] line-clamp-2 md:line-clamp-3">
          {title}
        </Typography>
      )}
      {/* 描述，手機2行，桌面3行 */}
      {description && (
        <p className="mt-3 text-sm text-blue-gray-400 leading-relaxed px-2 line-clamp-2 md:line-clamp-3">
          {description}
        </p>
      )}
      {socials && <div className="mx-auto mt-5">{socials}</div>}
    </Card>
  );
}

ProfileCard.defaultProps = {
  socials: null,
  title: "豬豬網頁設計師",
};

ProfileCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  socials: PropTypes.node,
  description: PropTypes.string,
};

ProfileCard.displayName = "/src/widgets/layout/profile-card.jsx";

export default ProfileCard;
