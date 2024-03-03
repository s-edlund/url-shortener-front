"use client"
import LoginPage from '@/app/login/page';
import PandaPage from '@/app/panda/page';

export default function Page() {
  return (<main className="flex min-h-screen flex-col p-6">
    <PandaPage/>
    <LoginPage/>
  </main>)
}
