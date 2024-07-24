import AuthForm from '../../../components/AuthForm';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] sm:bg-[#FAFAFA]">
       <h1 className="text-purple-600 font-bold text-xl mb-[51px]">devlinks</h1>

      <div className="min-w-0[375px] max-w-[476px] w-full space-y-8 bg-[#FFFFFF] p-[40px]">
        <div>
          <h2 className="mt-6 text-[32px] font-[700] leading-[150%] text-[#333333]">Login</h2>
          <p className="text-[#737373] text-[16px]">Add your details below to get back into the app</p>
        </div>
        <AuthForm isLogin />

        <div className='flex flex-col sm:flex-row justify-center items-center gap-1'>
        <p className="text-[#737373] text-[16px]">Don’t have an account?</p>
        <Link href="/auth/signup" className="text-[#633CFF] text-[16px]">Create account</Link>
        </div>

      </div>


    </div>
  );
}