import AuthForm from "../../../components/AuthForm";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] sm:bg-[#FAFAFA]">
      <h1 className="text-purple-600 font-bold text-xl mb-[51px]">devlinks</h1>

      <div className="min-w-0[375px] max-w-[476px] w-full space-y-8 bg-[#FFFFFF] p-[40px]">
        <div>
          <h2 className="mt-6 text-[32px] font-[700] leading-[150%] text-[#333333]">
            Create account
          </h2>
          <p className="text-[#737373] text-[16px]">
            Let’s get you started sharing your links!
          </p>
        </div>
        <AuthForm />

        <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
          <p className="text-[#737373] text-[16px]">Already have an account?</p>
          <Link href="/auth/login" className="text-[#633CFF] text-[16px]">
          Login
          </Link>
        </div>

      </div>
    </div>
  );
}
