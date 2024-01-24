/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */

// import Image from 'next/image';
import Link from "next/link";
import { FC } from "react";

// import logoImage from '../../../public/assets/logo.png';

type LogoProps = Readonly<{ className?: string }>;
const Logo: FC<LogoProps> = ({ className = "inline-block w-[100px]" }) => {
  return (
    <Link href="/" className={className}>
      {/* <Image src={logoImage} alt="logo" className="w-full" /> */}
    </Link>
  );
};
export default Logo;
