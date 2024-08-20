"use client";

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Home() {

  console.log("starting")

  //const [searchTerm, setSearchTerm] = useState('');

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filteredFaqs, setfilteredFaqs] = useState([]);
  const [faqs, setfaqs] = useState([

    {
      question: 'What is Next.js?', 
      answer: 'Next.js is a React framework for building web applications.',
      open: false
    },
    { 
      question: 'How does Tailwind CSS work?', 
      answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
      open: false
    },
    { 
      question: 'What is the purpose of getStaticProps?', 
      answer: 'getStaticProps is used to fetch data at build time in Next.js.',
      open: false
    }
  ]);

    const filterFaqs = (term) => {

      //const wordSearch = new RegExp(`\\b${term}\\b`, 'i'); use this if you want only whole words with the test feature
      const filtered = faqs.filter( faq =>
        faq.question.toLowerCase().includes(term.toLowerCase())
      );
      setfilteredFaqs(filtered);
    }

    const handleSearch = useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
      filterFaqs(term);
    }, 400);
    
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center">

      <header className= "font-mono text-4xl flex pt-5 justify-center">
        <h1>FAQ PAGE</h1>
      </header>

      <div className="pt-5">
        <input
          type="search"
          className="relative m-0 -me-0.5 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
          placeholder="Search" 
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
        {/* <button
          class="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
          data-twe-ripple-init
          data-twe-ripple-color="white"
          type="button"
          id="button-addon3">
          Search
        </button> */}
      </div>

      <div className="pt-5 flex flex-row space-x-4">
        <button 
        className="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950">
          Expand All 
          </button>
          <button 
        className="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950">
          Collapse All 
          </button>
      </div>

      <div className="mt-20 w-[80%] h-96 overflow-y-auto border border-neutral-200 rounded">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <FAQ faq={faq} i={index}/>
          ))
        ) : (
          <div className="p-4 text-gray-500">No questions found.</div>
        )}
      </div>


    </main>
  );
}


function FAQ ({faq, i}){
  return (
    <div key={i} className="p-4 border-b border-neutral-200">
      <div className="faq-question">
          {faq.question}
      </div>

      <div className="faq-answer">
          {faq.answer}
      </div>

    </div>
  )
}
