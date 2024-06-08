import Layout from "@/layout/Layout";
import Navbar from "@/layout/Header/Navbar";
import HeroSection from "@/components/hero-section/HeroSection2";
import WorkProcess from "@/components/workprocess/WorkProcess";
import Feature from "@/components/features/Feature";
import FeatureImgContent from "@/components/feature-img-content/FeatureImgContent";
import Testimonial from "@/components/testimonial/Testimonial";
import Pricing from "@/components/pricing/Packages";
// import Integration from '@components/integration/IntegrationOne';
import Faq from "@/components/faq/FaqThree";
import Support from "@/components/support/SupportOne";
import LatestBlog from "@/components/blogs/LatestBlog";
import Footer from "@/layout/Footer/Footer";

import { landing } from "@/utils/metaData";

const { title, description } = landing;

export default function Home() {
  return (
    <Layout title={title} description={description}>
      <Navbar navDark />
      <HeroSection />
      <WorkProcess />
      <Feature cardDark />
      <FeatureImgContent />
      <Testimonial darkBg />
      <Pricing header="true" />
      <Faq />
      {/* <Integration /> */}
      <Support />
      <LatestBlog />
      <Footer footerGradient />
    </Layout>
  );
}
