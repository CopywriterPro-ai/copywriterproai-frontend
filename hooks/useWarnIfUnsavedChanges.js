import Router from "next/router";
import { useEffect } from "react";

const useWarnIfUnsavedChanges = (unsavedChanges, callback) => {
  useEffect(() => {
    const confirmationMessage = "Changes you made may not be saved.";
    const beforeUnloadHandler = (e) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };
    const beforeRouteHandler = (url) => {
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        Router.events.emit("routeChangeError");
        throw `Route change to "${url}" was aborted (this error can be safely ignored).`;
      }
    };
    if (unsavedChanges) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
      Router.events.on("routeChangeStart", beforeRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [unsavedChanges]);
};

export default useWarnIfUnsavedChanges;
