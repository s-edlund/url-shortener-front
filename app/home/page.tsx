"use client"

import React, { useState } from 'react';
import styles from '@/app/home/home.module.css';
import { URLUtils } from '../utils/url-utils';

// Should come from config, e.g. configmap in k8s.
const SERVER_PROTOCOL = "http";
const SERVER_HOST = "localhost";
const SERVER_PORT = "3001";
const SERVER_SHORTENER_ENDPOINT= "shorten";
const SHORTENING_QUERY_PARAM = 'url';

const urlUtils = new URLUtils();

<div className={styles.shape} />;

export default function Page() {

  // Url to shorten
  const [getUrl, setURL] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [fetchedResults, setFetchedResults] = useState("");
  const [getError, setError] =  useState("");

  const handleURLChange = (val: any) => {
    let url = val.target.value.trim();
    const disabled = !isValidUrl(url);
    console.log(`changed ${url} ${disabled} ${url}`)
    setURL(url);
    setButtonDisabled(disabled);
    setFetchedResults(""); // clear out old results on change
  }

  const isValidUrl = (url: string): boolean => {
    const valid = urlUtils.isValidUrl(url);
    if(valid)
      setError('');
    else 
      setError(`Invalid URL: ${url}`);

    return valid;
  }

  const ResultPage = (input: {result: string|undefined}) => {
    if(input.result) 
      return (
      <div>
          <div className = {styles.success}>Success! Here is your short URL:</div>
          <div>
            <a target="_blank" href={fetchedResults} className={styles.urllink}>{fetchedResults}
          </a>
          <button className="hover:bg-blue-300 bg-blue-400 focus:outline-none text-white font-bold py-1 px-4 ml-2 rounded border-solid border-2" onClick = {copyToClipboard}>Copy</button>
        </div>
      </div>)
    else 
      return <div></div>;
  }

  let err: string|undefined = undefined;
  const ErrorPage = () => {
    if(getError) 
      return <div className = {styles.error}>{getError}</div>;
    else 
      return <div></div>;
  }

  const submitShortenRequest = (e) => {

    // const urlWithoutProtocol = urlUtils.getUrlWithoutProtocol(getUrl);

    e.preventDefault();
    
    const fetchUrl = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/${SERVER_SHORTENER_ENDPOINT}?${SHORTENING_QUERY_PARAM}=${getUrl}`;
    fetch(fetchUrl)
      .then(response => {
        if(response.status !== 200)
          throw new Error(response.statusText);
        return response.json();
      })
      .then(result  => {
        const slug = result.data[0]?.attributes?.slug;
        if(!slug) {
          setError(`Server returned unexpeted JSONAPi results`)
        } else {
          const resultUrl = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/${slug}`
          setFetchedResults(resultUrl);
          console.log(resultUrl);
        }
      })
      .catch(err => {
        setFetchedResults("");
        err  = err.message;
        console.log(`error ${JSON.stringify(err, null, 2)}`)});
  }

  const copyToClipboard = () => {
    // alert('click');
    navigator.clipboard.writeText(fetchedResults)
  }
  
  return (
    <div className = "grid grid-cols-1">
        <div>
        <div className="md:flex">
          <form className="w-full max-w-lg" onSubmit={submitShortenRequest} >
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
            <button disabled={isButtonDisabled} className="hover:bg-blue-300 bg-blue-400 focus:outline-none text-white font-bold py-1 px-4 rounded border-solid border-2" type="submit">
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
  
 }