"use client";

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Home() {

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
    },
    {
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces, primarily for single-page applications.',
      open: false
    },
    {
      question: 'How does server-side rendering work in Next.js?',
      answer: 'Server-side rendering in Next.js allows you to pre-render a page on the server for each request, improving performance and SEO.',
      open: false
    },
    {
      question: 'What is the difference between a class component and a functional component in React?',
      answer: 'Class components can hold and manage local state and have lifecycle methods, while functional components are simpler and use hooks for state and side effects.',
      open: false
    },
    {
      question: 'How do you use environment variables in Next.js?',
      answer: 'In Next.js, environment variables are stored in `.env.local` file and accessed using `process.env.VARIABLE_NAME`.',
      open: false
    },
    {
      question: 'What is Tailwind CSS?',
      answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs quickly and efficiently using pre-defined classes.',
      open: false
    }
  ]);

  const [filteredFaqs, setfilteredFaqs] = useState(faqs);


   const filterFaqs = (term) => {

      //const wordSearch = new RegExp(`\\b${term}\\b`, 'i'); use this if you want only whole words with the test feature
      const filtered = faqs.filter( faq =>
        faq.question.toLowerCase().includes(term.toLowerCase())
      );
      setfilteredFaqs(filtered);
    }

    const toggle = (i) => {

      const updatedFaqs = filteredFaqs.map((faq, index) => {
        if (i === index) {
          return { ...faq, open: !faq.open };
        } else {
          return faq;
        }
      });
    
      setfilteredFaqs(updatedFaqs);
    };

    const expandAll = () => {
      const updatedFaqs = filteredFaqs.map(faq => ({ ...faq, open: true }));
      setfilteredFaqs(updatedFaqs);
    };

    const collapseAll = () => {
      const updatedFaqs = filteredFaqs.map(faq => ({ ...faq, open: false }));
      setfilteredFaqs(updatedFaqs);
    };

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
      </div>

      <div className="pt-5 flex flex-row space-x-4">
        <button 
          className="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:text-primary-500 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
          onClick={() => expandAll()}>
          Expand All 
          </button>
        <button 
          className="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:text-primary-500 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
          onClick={() => collapseAll()}>
          Collapse All 
          </button>
      </div>

      <div className="mt-10 w-[80%] h-96 overflow-y-auto border border-neutral-200 rounded">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, i) => (
            <div key={i} className="pt-4 border-b border-neutral-200">
              <div 
                className="faq-question flex flex-row items-center cursor-pointer pr-4 pl-4"
                onClick={() => toggle(i)}
              >
                  <h2> {faq.question} </h2>
                  <span className="ml-auto text-xl">+</span>
              </div>
        
              { faq.open ?
              <div className="faq-answer bg-gray-800 pb-2 pt-2 pl-4">
                  {faq.answer}
              </div>
              :  (<div className="pt-4"></div>)}
        
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-500">No questions found.</div>
        )}
      </div>
    </main>
  );
}