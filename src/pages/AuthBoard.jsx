import React, {useEffect, useRef} from 'react';
import {mountBoard} from './auth/board';
import './auth/board.css';

export default function AuthBoard(){
  const host = useRef(null);
  useEffect(() => mountBoard(host.current, process.env.PUBLIC_URL || ''), []);
  return <div className="ab" ref={host} dir="rtl" lang="fa"/>;
}
