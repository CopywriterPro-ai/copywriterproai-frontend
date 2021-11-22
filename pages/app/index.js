import React from "react";
import { useSelector } from "react-redux";

import { UserLayout as Layout } from "@/layout";
import { GenerateSidebar, MainSidebar } from "@/components/sidebar";
import { useSidebar } from "hooks";
import { selectors as uiSelector } from "@/redux/slices/ui";
import { SubscriberModal } from "@/components/modals/subscriber";
import { useWindowSize } from "@/hooks";

const App = () => {
  const { showSidebar, showContent } = useSidebar();
  const { subscriber } = useSelector(uiSelector.getModal);
  const { width: windowWidth } = useWindowSize();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          {showSidebar && <MainSidebar />}
          {showContent && (
            <>
              <div
                className={`col-lg-${windowWidth < 1600 ? "3" : "2"}`}
                style={{
                  paddingTop: "15px",
                  borderRight: "1px solid rgba(0,0,0,.1)",
                }}
              >
                <GenerateSidebar />
              </div>
              <div className={`col-lg-${windowWidth < 1600 ? "9" : "10"}`}>
                <h4
                  style={{
                    display: "flex",
                    height: "70vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Please select a tool from sidebar
                </h4>
              </div>
            </>
          )}
        </div>
      </div>
      {subscriber?.usage && <SubscriberModal />}
    </Layout>
  );
};

export default App;
