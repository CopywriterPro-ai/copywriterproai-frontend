import DigitalMarketing from "assets/images/landing/offers-section/digital-marketing.png";
import SocialMedia from "assets/images/landing/offers-section/social-media.png";
import ECommerce from "assets/images/landing/offers-section/e-commerce.png";
import Website from "assets/images/landing/offers-section/website.png";
import Writing from "assets/images/landing/offers-section/writing.png";
import Blog from "assets/images/landing/offers-section/blog.png";
import SalesCopy from "assets/images/landing/offers-section/sales-copy.png";
import Business from "assets/images/landing/offers-section/business.png";
import AndMore from "assets/images/landing/offers-section/more.png";

const items = [
  {
    title: "Digital Marketing",
    icon: DigitalMarketing,
    list: [
      { text: "Facebook Ads" },
      { text: "Google Ads" },
      { text: "LinkedIn Ads" },
    ],
  },
  {
    title: "Social Media",
    icon: SocialMedia,
    list: [
      { text: "Bio Writing" },
      { text: "Generate Ideas" },
      { text: "Headline, Caption" },
      { text: "Description" },
    ],
  },
  {
    title: "E-Commerce",
    icon: ECommerce,
    list: [{ text: "Product Description" }, { text: "Product Review" }],
  },
  {
    title: "Website",
    icon: Website,
    list: [
      { text: "Headline" },
      { text: "Short Description" },
      { text: "Generate Keywords" },
    ],
  },
  {
    title: "Writing",
    icon: Writing,
    list: [
      { text: "Paraphrasing" },
      { text: "Text Simplifier" },
      { text: "Email Writing" },
    ],
  },
  {
    title: "Blog",
    icon: Blog,
    list: [
      { text: "Blog Idea" },
      { text: "Blog Headline, Outline" },
      { text: "Blog intro" },
    ],
  },
  {
    title: "Sales Copy",
    icon: SalesCopy,
    list: [
      { text: "Pain-Agitate-Solution" },
      { text: "PASO, AIDA" },
    ],
  },
  {
    title: "Business",
    icon: Business,
    list: [{ text: "Product Name" }, { text: "Tagline" }],
  },
  {
    title: "and more ...",
    icon: AndMore,
    list: [{ text: "CV Summary" }, { text: "Fiverr Gig Title" }],
  },
];

export default items;
