"use client"
import { shortenURL } from '@/services/AnonService';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useForm } from 'react-hook-form';

export default function NewLinkForm() {
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
      { shortURL && <span>Short URL: <a href={shortURL}>{shortURL}</a></span> }
    </form>
  )


  async function onSuccess(data: FormValues) {
    // Send
    const res = await shortenURL(data.originalURL)
    setShortURL(res.url)
  }
}

type FormValues = {
  originalURL: string;
};