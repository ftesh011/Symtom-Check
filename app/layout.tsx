import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SympTrack",
  description: "Find out what you may be suffering from your symptoms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <nav className="flex justify-around px-20 py-5 border-b-2 border-gray-700 shadow-md font-serif">
            <Link className='hover:underline' href='/SignUp'>Sign Up</Link>
            <Link className='hover:underline'href='/Login'>Login</Link>
            <Link className='hover:underline'href='/'>Home</Link>
            <Link className='hover:underline'href='/create'>Symptom Checker</Link>
            <Link className='hover:underline'href='/diagnoses2'>Previous Diagnoses</Link>
            <Link className='hover:underline'href='/#how_it_works'>How it works</Link>
            <Link className='hover:underline'href='/store'>Store</Link>
          </nav>
          {children}
          <footer className="px-20 py-5 border-t-2 border-gray-700 shadow-md">
            <p className="text-lg font-serif">
            Important Notice 
            </p>
            <div className="font-serif">SymTrack is an application that provides proabale diagnoses to symptoms. 
              SymTrack does not provide a definite diagnoses and would output likely diagnoses
              which are based on common symtpoms. We strongly advise to consult with a medical professional and do further
              reserach before making any decisions related significant health issues that may have major implications. SymTrack
              specializes in providing information and resources to common and minor conditions.
            </div>
          </footer>
        </body>
    </html>
  );
}
