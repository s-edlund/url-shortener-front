"use client"

import React, { useEffect, useState } from 'react';
import { URLUtils } from '../utils/url-utils';
import { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL, SERVER_SHORTENER_ENDPOINT, SERVER_UPDATE_SLUG_ENDPOINT, SERVER_URLFETCH_ENDPOINT, SHORTENING_QUERY_PARAM } from '../config/config';
import { JSONApiResult, UrlRec } from '../model/model';

const urlUtils = new URLUtils();

export default function Page(props: {user: string}) {

  const user = props?.user;
  console.log(`user is ${user}`)


  const [getUrls, setUrls] = useState([] as UrlRec[]);

  const fetchURLs = (e?:any) => {
    if(e) 
      e.preventDefault();

    const fetchUrl = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/${SERVER_URLFETCH_ENDPOINT}?user=${user}`;
    fetch(fetchUrl)
      .then(response => {
        if(response.status !== 200)
          throw new Error(response.statusText);
        return response.json() as unknown as JSONApiResult;
      })
      .then(result  => {
        const newUrls = result.data.map(d => {
          return {
            slug: d.attributes.slug,
            url: d.attributes.url,
            id: d.attributes.id,
            user: d.attributes.user};});

        setUrls(newUrls);
      })
      .catch(err => {
        setUrls([]);
        err  = err.message;
        console.log(`error ${JSON.stringify(err, null, 2)}`);
      });
  }

  
  const renameSlug = (e: any, url: UrlRec) => {
    e.preventDefault();
    console.log(`rename ${url.slug}`)
    const newVal = slugValueMap[url.id];
    console.log(`newVal ${newVal}`);

    const renameUrl = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/${SERVER_UPDATE_SLUG_ENDPOINT}?user=${user}`;

    const bodyString = JSON.stringify(
      {
        data: [{
          "type":"urlmapping",
          "id":url.id,
          "attributes" : {
            "slug": newVal
          }
        }]
      }
    );

    console.log(`sending body ${bodyString}`)
    
    fetch(renameUrl, {
      method: 'PUT', 
      headers: { 
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }, 
      body: bodyString
    }).then(response => {
      if(response.status !== 200)
        throw new Error(response.statusText);
      return response.json() as unknown as JSONApiResult;
    }).then(result  => {
      // Update table
      fetchURLs();
    }).catch(err => {
        setUrls([]);
        err  = err.message;
        console.log(`error ${JSON.stringify(err, null, 2)}`);
    });
    

  }

  const slugNameChange = (e:any, url: UrlRec) => {
    console.log(`url ${url} e: ${e}`);
    const val = e.target.value;
    console.log(`val ${val}`);
    slugValueMap[url.id] = val;
  };

  const slugValueMap: {[key: number]: string} = {}; 


  const getUrlRowContent = (url: UrlRec) => {
    return (<React.Fragment key={url.id}>
      <div>{url.url}</div>
      <div>{url.slug}</div>
      <div>{url.id}</div>
      <div><form onSubmit={()=>renameSlug(event, url)}><input type="text" required minLength={1} maxLength={100} size={20} onChange={()=>slugNameChange(event, url)} className="p-1" ></input><button type="submit" className="hover:bg-blue-300 bg-blue-400 focus:outline-none text-white font-bold py-1 px-4 rounded border-solid border-2">Rename</button></form></div>
      </React.Fragment>)
  }

  return (
    <div>
      <div>
        <button onClick={fetchURLs} className="hover:bg-blue-300 bg-blue-400 focus:outline-none text-white font-bold py-1 px-4 rounded border-solid border-2">Fetch my URLs</button>
      </div>
      <div className = "grid grid-cols-4 border-solid border-2 ">
        <div className="font-bold">URL</div>
        <div className="font-bold">Slug</div>
        <div className="font-bold">ID</div>
        <div className="font-bold">Rename</div>
        
        {getUrls.map(url => getUrlRowContent(url))}
      </div>
    </div>
  )
  
 }