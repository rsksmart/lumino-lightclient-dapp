import React from "react";
import { toast } from "react-toastify";

const toastTitles = {
  ERROR: "Error",
  SUCCESS: "Success",
  INFO: "Information",
  WARNING: "Warning"
};

const showSuccess = message =>
  toast.success(<ToastTemplate message={message} type="SUCCESS" />, {
    position: toast.POSITION.TOP_RIGHT
  });

const showWarning = message =>
  toast.warn(<ToastTemplate message={message} type="WARNING" />, {
    position: toast.POSITION.TOP_RIGHT
  });

const showError = message =>
  toast.error(<ToastTemplate message={message} type="ERROR" />, {
    position: toast.POSITION.TOP_RIGHT
  });

const showInfo = message =>
  toast.info(<ToastTemplate message={message} type="INFO" />, {
    position: toast.POSITION.TOP_RIGHT
  });

const ToastTemplate = ({ message, type }) => {
  return (
    <div className="w-100">
      <div>
        <h4>
          <b>{toastTitles[type]}</b>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export { showError, showSuccess, showWarning, showInfo };
