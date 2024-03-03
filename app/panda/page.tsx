"use client"

import React, { useEffect, useState } from 'react';
import { URLUtils } from '../utils/url-utils';
import Image from 'next/image';

const urlUtils = new URLUtils();

export default function Page() {

  return (
    <div>
      <Image
        src="/panda-front.png"
        className="hidden md:block"
        width={200}
        height={200}
        alt="Panda the fearless"
        title="Panda the fearless"
      />
    </div>
  )
  
 }