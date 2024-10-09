const InfoItem = ({ title, content }) => (
  <div className="w-full max-w-[289px]">
    <h3 className="text-xs font-semibold text-base90">{title}</h3>
    <p className="text-xs lg:text-sm text-[#444444]">{content}</p>
  </div>
);

export default InfoItem;
