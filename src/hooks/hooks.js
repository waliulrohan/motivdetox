import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { notifyError, notifySuccess, notifyLoading } from "../lib/Toasting";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        console.log(isError, error);
        if (fallback) fallback();
        else notifyError(error.response.data.message || "Something went wrong");
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutation) => {
  console.count('nigger 1')
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = notifyLoading(toastMessage || "Updating data...");
    console.count('nigger 2')

    try {
  console.count('nigger 3')

      const res = await mutation.mutateAsync(...args);
      if (res.success) {
        notifySuccess(res?.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res);
        return res;
      } else {
        notifyError("Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      notifyError(error?.response?.data?.message || "Something went wrong", { id: toastId });
      return error?.response?.data;
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data];
};

export { useErrors, useAsyncMutation };
