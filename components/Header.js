import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="w-full flex flex-row border-b border-gray-300 shadow py-2 items-center">
      <Link href="/">
        <div className="p-1 w-10 h-8 ml-6 test relative hover:cursor-pointer">
          <Image src="/favicon.png" alt="Logo" layout="fill" />
        </div>
      </Link>
      <h1 className="text-gray-700 text-center p-1 pl-8" style={{ fontSize: '1.5rem' }}>
        Pruthvi&apos;s Blog
      </h1>
    </div>
  );
};

export default Header;
