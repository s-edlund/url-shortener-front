"use client"
import HomePage from '@/app/home/page';
import Image from 'next/image';

export default function Page() {
  return (<main className="flex min-h-screen flex-col p-6">
    <Image
        src="/panda-front.png"
        className="hidden md:block"
        width={200}
        height={200}
        alt="Panda the fearless"
        title="Panda the fearless"
      />
    <HomePage/>
  </main>)
}
