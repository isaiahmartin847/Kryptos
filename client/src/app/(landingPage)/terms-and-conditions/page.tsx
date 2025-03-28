import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TermsAndConditions } from "@/types/misc";
import { ApiResponse } from "@/types/requestBody";

const formatContent = (content: string) => {
  // First replace literal "\n" strings with actual newline characters
  const formattedContent = content.replace(/\\n/g, "\n");

  return formattedContent.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph.split("\n").map((line, lineIndex) => (
        <span key={lineIndex}>
          {line}
          <br />
        </span>
      ))}
    </p>
  ));
};

const TermsPage = async () => {
  // Determine if we're on the server or client side
  const isServer = typeof window === "undefined";

  // Use the appropriate base URL based on environment
  const baseUrl = isServer
    ? "http://rest-api:8080"
    : process.env.NEXT_PUBLIC_REST_API_URL;

  if (!baseUrl) {
    throw new Error("API URL is not defined.");
  }

  let termsAndConditions: ApiResponse<TermsAndConditions> | null = null;

  try {
    const response = await fetch(`${baseUrl}/user/terms`);

    if (!response.ok) {
      throw new Error(
        `Unable to get the terms and service msg: ${response.statusText}`,
      );
    }

    termsAndConditions = await response.json();
  } catch (error) {
    console.error("Error fetching terms and conditions:", error);
  }

  return (
    <div className="flex h-[calc(100vh-75px)] w-full items-center justify-center">
      <Card className="h-3/4 w-full md:w-2/4">
        <CardHeader>
          <h1 className="text-xl font-semibold">Terms & Conditions</h1>
        </CardHeader>
        <CardContent>
          {termsAndConditions ? (
            <div className="max-h-[60vh] overflow-y-auto">
              {termsAndConditions?.data.item?.content &&
                formatContent(termsAndConditions.data.item.content)}
            </div>
          ) : (
            <div>
              Error loading terms and conditions. Please try again later.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
