import { useRouteError } from "react-router-dom";
import { z } from "zod";

const ErrSchema = z.object({
  statusText: z.optional(z.string()),
  message: z.optional(z.string()),
});

export default function ErrorPage() {
  const error = useRouteError();
  const parsedErr = ErrSchema.parse(error);

  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred. ERROR:</p>
      <p>
        <i>{parsedErr.statusText || parsedErr.message}</i>
      </p>
    </div>
  );
}
