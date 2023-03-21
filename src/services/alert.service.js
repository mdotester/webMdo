import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import * as React from "react";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
};

export const AlertType = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

export { AlertBox };
const alertSubject = new Subject();
const defaultId = "default-alert";

const AlertBox = (props) => {
  const { open, setOpen, message, errorType, ...rest } = props;
  //    const [open, setOpen] = React.useState(true);
  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        severity={errorType}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

// convenience methods
function success(message, options) {
  alert({ ...options, type: AlertType.Success, message });
}

function error(message, options) {
  alert({ ...options, type: AlertType.Error, message });
}

function info(message, options) {
  alert({ ...options, type: AlertType.Info, message });
}

function warn(message, options) {
  alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
function alert(alert) {
  alert.id = alert.id || defaultId;
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
  alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
  alertSubject.next({ id });
}
