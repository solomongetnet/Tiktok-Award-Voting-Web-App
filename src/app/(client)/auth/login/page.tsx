import GoogleLoginContainer from "./_google-login-container";

function LoginPage() {
  return (
    <main className=" min-h-screen flex justify-center items-center">
      <div className="bg-white mx-auto border-2 p-4 rounded shadow-md w-[90%] md:w-[400px]">
        <GoogleLoginContainer />
      </div>
    </main>
  );
}

export default LoginPage;
