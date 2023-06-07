'use client'
// import URLListTable from '@/app/components/URLList';
import NewLinkForm from '@/app/components/form/NewLinkForm';
import React, { useState } from 'react';
import URLListTable from '../components/URLList';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {


  const [updateList, updateListFn] = useState();

  return (
    <main className="">
      <div className="border-b-2 border-white flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold">This is a url shortener</h1>
          <p>Enter a url to shorten it</p>
        </div>
        <div className="mb-60">
          <NewLinkForm updateListFn={updateListFn} />
        </div>
        <div className="absolute text-center bottom-0 h-16 font-semibold">Scroll down to see your links</div>
      </div>
      <div className="border-t-2 border-white flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-orange-500">
        <div className="mb-8 mt-8 text-center">
          <h1 className="text-3xl font-extrabold">Links</h1>

        </div>
        <div className='mb-20'>
          <URLListTable updateList={updateList} updateListFn={updateListFn} />
        </div>
        <Link href="https://github.com/tyrese-r/url-shortener">
          <div className="text-center bottom-0 h-16 font-semibold flex flex-row">
            <FaGithub className="text-black hover:text-gray-800 w-6 h-6 mr-2" />
            <p>tyrese-r/url-shortener</p>
          </div>
        </Link>

      </div>
    </main>
  );
}
