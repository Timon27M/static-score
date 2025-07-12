import AuthProvider from "@/shared/lib/Auth/AuthProvider";

function RandomPage() {
  return (
    <AuthProvider>
      <div>
        <h1>This is a random page!</h1>
      </div>
    </AuthProvider>
  );
}

export default RandomPage;
