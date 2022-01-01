import { useEffect } from "react";

const ExtensionAuth = () => {
  const isAuth = true;
  const extensionId = "ncnhfcebpoiiofmlojojkienolhccobb";

  useEffect(() => {
    if (isAuth) {
      try {
        if (chrome && chrome.runtime) {
          chrome.runtime.sendMessage(
            extensionId,
            {
              message: "userAuth",
              payload: { isAuthenticated: true },
            },
            (response) => {
              if (response) {
                console.log(response);
              }
            }
          );
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        console.log("The end");
      }
    }
  }, [isAuth]);

  return (
    <div>
      <h2>Extension Auth</h2>
    </div>
  );
};

export default ExtensionAuth;
