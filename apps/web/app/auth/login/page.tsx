/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import linkFarmImage from '@/public/assets/side-view-women-shaking-hands.jpg';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Container */}
      <div className="flex flex-row w-full">
        {/* Sidebar */}
        <div className="hidden relative md:flex overflow-hidden flex-col justify-between bg-auth-1 bg-[#0b1c0e] p-8 xl:p-12 py-16 md:max-w-sm xl:max-w-[480px] w-full !pr-5">
          <div className="flex flex-col gap-y-10">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-gray-50 rounded-full size-8" />
              <Link href="#" className="font-medium text-gray-100 text-xl">
                LinkFarm
              </Link>
            </div>

            <div className="space-y-5 w-full ">
              <h1 className="text-3xl lg:text-4xl !leading-snug text-gray-100 font-extrabold">
                Succeed in business <br />
                Express your farming knowledge !
              </h1>
              <p className="text-sm font-medium text-gray-300 !leading-relaxed">
                Bring out the best in your agricultural talents and be at the
                centre of your farming business
              </p>
            </div>
          </div>
          <div className="size-full absolute bottom-0 bg-black/60  inset-x-0 max-h-[450px]">
            <Image
              src={linkFarmImage}
              width={1280}
              alt="Farm Link"
              className="size-full object-cover"
            />
          </div>
        </div>
        {/* Login */}
        <div className="flex flex-1 flex-col justify-center px-20 lg:px-28 xl:px-36 relative">
          {/* Login box */}
          <div className="flex flex-1 flex-col  justify-center space-y-12 max-w-md">
            <h3 className="text-2xl font-bold">Signup to Link Farm</h3>
            <div className="flex flex-col gap-y-6">
              <Link href="#" className="flex gap-x-4 opacity-100 text-sm font-medium hover:opacity-80 duration-300 transition-all font-mono items-center justify-center flex-none p-4 bg-[#0b1c0e] text-white rounded-[99px] border-black relative">
                <span className="">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      fill="#EA4335 "
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                    />
                  </svg>
                </span>
                <span>Sign in with Google</span>
              </Link>
              <div className="flex justify-center items-center">
                <span className="h-px w-full bg-gray-200" />
                <span className="px-4 text-sm text-gray-500">Or</span>
                <span className="h-px w-full bg-gray-200" />
              </div>
              <Link
                href="#" className="flex gap-x-4 text-sm font-medium  font-mono border items-center justify-center flex-none p-4 border-gray-200 text-gray-800 hover:border-gray-400 transition-colors duration-300 rounded-[99px] relative"
              >
                Confirm with email
              </Link>
            </div>

            <div className="flex flex-col gap-y-6 items-center text-center">
              <p className='text-xs text-gray-700 !leading-snug'>By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings. </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
