import AuthForm from "../../../components/AuthForm";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] sm:bg-[#FAFAFA]">
      <div className=' mb-[51px]'>
          <Image alt='devLinks' src='/images/logo.svg' width={146} height={32} />
      </div>

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
          <Link href="/" className="text-[#633CFF] text-[16px]">
          Login
          </Link>
        </div>

      </div>
    </div>
  );
}
