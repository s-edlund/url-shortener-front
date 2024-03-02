import React, { useState } from 'react';
import styles from '@/app/home/home.module.css';

<div className={styles.shape} />;

export default function Page() {
   // Url to shorten
  let url: string|undefined = undefined;



  const submitURL = () => {
      console.log('click');
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(response => response.json())
        .then(data => {
          setFetchedResults(JSON.stringify(data));
          console.log(data);
        })
        .catch(err => {
          err  = err.message;
          console.log(`error ${JSON.stringify(err, null, 2)}`)});
    }

  const handleURLChange = (val: any) => {
    url = val.target.value.trim();
    const disabled = isValidUrl();
    console.log(`changed ${url} ${disabled} ${url}`)
    setButtonDisabled(disabled);
  }

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [fetchedResults, setFetchedResults] = useState("");

  const isValidUrl = (): boolean => {
    if(!url || url.length == 0) return true;
    return false;
  }



  const ResultPage = (input: {result: string|undefined}) => {
    console.log(`res: ${input.result}`)
    if(input.result) 
      return <div><div className = {styles.success}>Success! Here is your short URL:</div><div>{fetchedResults}</div></div>
    else 
      return <div></div>;
  }

  let err: string|undefined = undefined;
  const ErrorPage = () => {
    if(err) 
      return <div className = {styles.error}>err</div>;
    else 
      return <div></div>;
  }

  return (
    <div className = "grid grid-cols-1">
        <div>
        <div className="md:flex">
          <form className="w-full max-w-lg">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
                Enter a URL to shorten:
              </label>  
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
              id="url" 
              placeholder="enter url here"
              onChange={handleURLChange} />
            </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-3/3">
            <button onClick={submitURL} disabled={isButtonDisabled} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Shorten
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
    <ResultPage result={fetchedResults}/>
    <ErrorPage/>
    </div>
  )
  /*
  return (

    
    <div className="md:flex md:items-center">
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
              Enter a URL to shorten:
            </label>  
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
            id="url" 
            placeholder="enter url here"
            onChange={handleURLChange} />
          </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button onClick={submitURL} disabled={isButtonDisabled} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Shorten
            </button>
          </div>
        </div>
      </form>
      <div className="md:flex md:items-center">
        Hello
      </div>
    </div>
    );
*/
 }