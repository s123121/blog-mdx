export type Project = {
  name: string;
  description: string;
  url: string;
  thumbnail?: string;
};

const projects: Project[] = [
  {
    name: "Snapcut.ai",
    description:
      "An AI-powered video editing tool that transforms long videos into engaging clips in seconds.",
    url: "https://snapcut.ai",
    thumbnail: "https://snapcut.ai/favicon.ico",
  },
  {
    name: "Fiahub.com",
    description:
      "A cryptocurrency exchange platform that provides secure and easy-to-use services for buying, selling, and trading digital assets.",
    url: "https://www.fiahub.com",
    thumbnail: "https://www.fiahub.com/favicon.svg",
  },
  {
    name: "Autop2p",
    description:
      "Auto buy/sell crypto on P2P with ease. Fast, secure, and automated trading.",
    url: "https://autop2p.com",
  },
  {
    name: "Onmic",
    description:
      "A voice-streaming platform towards barrier-free expression and authentic connection through voice",
    url: "https://getonmic.com",
    thumbnail: "https://www.getonmic.com/favicon.svg",
  },
  {
    name: "Dora Studio",
    description:
      "An AI-powered design tool that transform text prompt to stunning graphics and visuals in minutes.",
    url: "https://dora.studio",
    thumbnail: "https://www.dora.studio/icondora.png",
  },
  {
    name: "MBBank News",
    description:
      "An internal news/social media platform providing the latest updates and insights for MBBank - one of the largest banks in Vietnam.",
    url: "https://news.mbbank.com.vn",
    thumbnail: "https://news.mbbank.com.vn/favicon.ico",
  },
  {
    name: "Likematch",
    description:
      "A matching app that helps you find your perfect match based on shared friends and interests.",
    url: "https://likematchapp.com/",
    thumbnail: "https://likematchapp.com/favicon.ico",
  },
  {
    name: "R50Time",
    description:
      "A matching platform for people over 50 to find companionship and meaningful connections.",
    url: "https://r50time.jp/",
    thumbnail: "https://r50time.jp/favicon.ico",
  },
  {
    name: "Xpath.co",
    description:
      "A platform connecting travelers from all over the world with local travel buddies to offer unique travel experiences.",
    url: "https://xpath.co",
  },
  {
    name: "Circlo App",
    description:
      "Easily see where your loved ones are in real time, all in one safe and simple app.",
    url: "https://apps.apple.com/us/app/circlo-family-360-tracker/id6742648470",
    thumbnail:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6e/cf/d2/6ecfd21a-e5a6-4a03-983d-edbc921745e2/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/460x0w.webp",
  },
];

export default projects;
