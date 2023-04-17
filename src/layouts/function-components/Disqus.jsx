import config from "@config/config.json";
import { DiscussionEmbed } from "disqus-react";
import React from "react";

const Disqus = () => {
  const { disqus } = config;
  return (
    <>
      {disqus.enable && (
        <DiscussionEmbed
          shortname={disqus.shortname}
          config={disqus.settings}
        />
      )}
    </>
  );
};

export default Disqus;
