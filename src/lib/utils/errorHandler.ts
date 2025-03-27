import { AppDispatch } from "@/store";
import { showAlertAction } from "@/store/alertSlice";

export default function errorHandler(error: unknown, dispatch: AppDispatch) {
  if (error instanceof Error) {
    console.error(error.message);
    dispatch(
      showAlertAction({
        type: "error",
        content: error.message,
      })
    );
  }
}
