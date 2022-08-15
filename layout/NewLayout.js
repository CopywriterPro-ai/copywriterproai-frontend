// import React, { useEffect } from "react";
// import { useRouter } from "next/router";

// import Processing from "@/pages/processing";
// import Layout from "./Layout";
// import Header from "@/components/common/Header/new/GuestHeader";
// import Footer from "@/components/common/Footer/NewFooter";
// import { useUser } from "@/hooks";
// import { USER_DEFAULT_PATH } from "@/appconstants";

// const NewLayout = ({
//   children,
//   title,
//   description,
//   otherSEO,
//   additionalMeta,
// }) => {
//   const router = useRouter();
//   const { isAuth, isRehydrated } = useUser();

//   useEffect(() => {
//     if (isAuth && isRehydrated) router.push(USER_DEFAULT_PATH);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAuth, isRehydrated]);

//   if (isAuth && isRehydrated) {
//     return <Processing color="#000" />;
//   }

//   return (
//     <Layout
//       title={title}
//       description={description}
//       otherSEO={otherSEO}
//       additionalMeta={additionalMeta}
//     >
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </Layout>
//   );
// };

// export default NewLayout;
