import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { checkSubscription } from '@/lib/subscription'
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-screen min-h-screen bg-stone-100	">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-4 mb-4 text-4xl font-semibold">Chat with your PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <p className="max-x-xl mt-2 text-lg text-slate-600">
            Welcome to PDF Chat, the groundbreaking app that revolutionizes the way you interact with PDF documents. Say goodbye to static files and hello to dynamic conversations!
          </p>
          


          <div className="w-full mt-4 mb-4">
            {isAuth ? (
              <FileUpload />
              ):(
              <Link href="/sign-in">
                <Button>
                  Login to get started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
          <div className="flex mt-4 mb-4 overflow-hidden">
            {isAuth && firstChat && 
            <Link href={`/chat/${firstChat.id}`}>
            <Button className="bg-cyan-600"> 
              My chats  <ArrowRight className="ml-2" />

            </Button>
            </Link>
            }
            <div className="ml-3">
              <SubscriptionButton isPro = { isPro } />
            </div>
          </div>
        </div>
      </div>



        <div className="w-full absolute bottom-0 mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Powered by <a href="https://paolobang.vercel.app/" className="hover:underline">RP Tech</a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="https://github.com/paolobang" className="hover:underline me-4 md:me-6">GitHub</a>
            </li>
            <li>
                <a href="https://paolobang.vercel.app/" className="hover:underline">Contact</a>
            </li>
        </ul>
        </div>
 

    </div>
  );
}
