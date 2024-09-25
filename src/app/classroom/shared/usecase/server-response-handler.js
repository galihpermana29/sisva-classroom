"use server";

import { convertToTitleCase } from "./global-helper";

export async function serverResponseHandler(
  res,
  errorCustomMessage,
  successCustomMessage
) {
  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    const isJson = contentType?.includes("json");

    let errorMessage = await res.json();

    if (isJson && typeof errorMessage === "object") {
      if (Object.prototype.hasOwnProperty.call(errorMessage, "errors")) {
        const errorMessages = Object.entries(errorMessage.errors)
          .map(([_, messages]) => {
            if (Array.isArray(messages)) {
              return messages.join(" ");
            }
            return convertToTitleCase(messages);
          })
          .join(" ");
        errorMessage = errorMessages;
      }
    }

    return generateErrorMessageFromServerError(
      res.status,
      errorMessage ? errorMessage : errorCustomMessage
    );
  } else {
    const response = res.body
      ? await checkBodyContentType(contentType, res)
      : null;

    const result = generateSuccessResponseFromServer(
      successCustomMessage,
      response.data
    );

    return result;
  }
}

export async function checkBodyContentType(contentType, response) {
  if (!contentType) {
    return "Success";
  }
  if (contentType?.includes("text")) {
    return await response.text();
  }
  if (contentType?.includes("application/json")) {
    return await response.json();
  }
  if (contentType?.includes("application/problem+json")) {
    return await response.json();
  }
}

export async function generateErrorMessageFromServerError(
  code,
  message,
  data = null
) {
  return {
    code,
    success: false,
    message,
    data,
  };
}

export async function generateSuccessResponseFromServer(message, data) {
  return {
    code: 200,
    success: true,
    message,
    data,
  };
}
