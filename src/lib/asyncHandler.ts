export const asyncHandler = (fn: Function) => {
    return async (...args: any[]) => {
      try {
        return await fn(...args);
      } catch (error) {
        console.error("Caught error in asyncHandler:", error);
        return new Response(
          JSON.stringify({ message: "Something went wrong", error }),
          { status: 500 }
        );
      }
    };
  };
  