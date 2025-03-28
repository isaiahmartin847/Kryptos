import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TermsPage = async () => {
  return (
    <div className="flex h-[calc(100vh-75px)] w-full items-center justify-center">
      <Card className="h-3/4 w-full md:w-2/4">
        <CardHeader>
          <h1 className="text-xl font-semibold">Terms & Conditions</h1>
        </CardHeader>
        <CardContent>
          <div>testing 123</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
