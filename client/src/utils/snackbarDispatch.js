export const snackbarDispatch = (
  dispatchFunction,
  successMessage,
  errorMessage,
  enqueueSnackbar,
  afterSuccess = []
) => {
  dispatchFunction
    .then(() => {
      enqueueSnackbar(successMessage, { variant: "success" });
      if (afterSuccess) afterSuccess.forEach((fn) => fn());
    })
    .catch((error) => {
      console.log(error);
      enqueueSnackbar(errorMessage, { variant: "error" });
    });
};
