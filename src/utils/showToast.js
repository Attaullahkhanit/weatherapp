import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastProperties = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
};

export const showSuccessToast = (message, options = {}) => {
  return toast.success(message, {
    ...toastProperties,
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  return toast.warning(message, {
    ...toastProperties,
  });
};

export const showErrorToast = (message, options = {}) => {
  return toast.error(message, {
    ...toastProperties,
  });
};