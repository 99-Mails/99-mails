import { Center } from "@chakra-ui/react";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: any;
}) {
  return (
    <Center>
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </Center>
  );
}

export { ErrorBoundary as default } from "react-error-boundary";
export { ErrorFallback };
