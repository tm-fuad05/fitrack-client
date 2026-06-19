import React from "react";

const titleColors = {
  default: "text-foreground dark:text-foreground-dark",
  white: "text-white",
  primary: "text-primary",
};

const SectionTitle = ({ subtitle, title, color = "default" }) => {
  return (
    <div className="uppercase mx-auto text-center space-y-2 w-10/12 lg:w-7/12">
      <p className="text-primary tracking-[4px] text-md lg:text-lg font-semibold">
        {subtitle}
      </p>
      <h2
        className={`${titleColors[color] || titleColors.default} text-2xl md:text-3xl lg:text-4xl leading-7 font-extrabold`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
