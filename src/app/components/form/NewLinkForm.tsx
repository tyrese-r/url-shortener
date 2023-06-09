"use client"
import { getURLList, shortenURL } from '@/services/AnonService';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useForm } from 'react-hook-form';

export default function NewLinkForm({updateListFn}: any) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit = handleSubmit(onSuccess)


  const [shortURL, setShortURL] = useState('')

  return (
    <form onSubmit={onSubmit}>
      <label>URL</label>
      <input className="bg-zinc-800" {...register("originalURL")} type="url" />
      <span>{errors?.originalURL?.message}</span>

      <button className="bg-zinc-300" type="submit">Submit</button>
      <div></div>
      { shortURL && <span>Short URL: <Link href={shortURL}>{shortURL}</Link></span> }
    </form>
  )


  async function onSuccess(data: FormValues) {
    // Send
    try {
      const res = await shortenURL(data.originalURL)
      setShortURL(res.short)
      updateListFn(Date.now())
    }catch(e) {
      console.error(e)
    } 
    

    console.log(getURLList())
  }
}

type FormValues = {
  originalURL: string;
};