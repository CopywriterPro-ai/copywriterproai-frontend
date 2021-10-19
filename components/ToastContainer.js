import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="dark"
      closeButton={false}
      transition={Slide}
    />
  );
};

export default Toast;
