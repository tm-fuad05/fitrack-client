/* eslint-disable no-unused-vars */
import { useState } from "react";

export const useValidateInput = (schema) => {
  const [error, setError] = useState([]);

  let isValid;
  let data;
  const validate = (payload) => {
    const { data: validatedData, error: validationError } =
      schema.safeParse(payload);

    data = validatedData;

    if (validationError) {
      isValid = false;
      setError(
        validationError?.issues?.map((err) => ({
          field: err?.path[0],
          message: err?.message,
        })),
      );
    }
  };
  return { isValid, error, setError, validate, data };
};
