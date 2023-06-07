'use client'

import { useEffect, useState } from "react"
import { useCopyToClipboard, useReadLocalStorage } from 'usehooks-ts'
import { URLList } from "../../../types/Local";
import { FaTrash } from "react-icons/fa";
import { removeURL } from "@/services/AnonService";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function URLListTable({updateList, updateListFn}: any) {

  const urlList = useReadLocalStorage('url_list') as URLList

  const [urlTable, setURLTable] = useState<URLList>([]);
  // eslint-disable-next-line no-unused-vars
  const [copyValue, copyFn] = useCopyToClipboard()
  useEffect(() => {
    if (urlList !== null) {
      setURLTable(urlList.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()));

    }
  }, [updateList, urlList])

  return urlTable.length > 0 ? (
    <>
      <ToastContainer />
      <CardsView />
    </>
  ) : <p>You have no links</p >;


  async function deleteLink(id: string) {
    try {

      const res = await removeURL(id)
      updateListFn(Date.now())
      if (res) {
        toast.info('Deleted link'); // Show success notification
      }
    } catch (e) {
      toast.error('Could not delete link'); // Show error notification
    }
  }
  // eslint-disable-next-line no-unused-vars
  function TableView() {
    return (
      <table className="w-full border rounded-full">
        <thead>
          <tr>
            <th className="py-2">Destination</th>
            <th className="py-2">Short URL</th>
          </tr>
        </thead>
        <tbody>
          {urlTable.map((link) => (
            <tr key={link.shortURL} className="border rounded-lg">
              <td
                className="py-4 p-10 sm:p-0 text-s cursor-default hover:cursor-pointer "
                onClick={() => copyFn(link.destination)}
                title={link.destination}>

                <p className="border-b-2 border-white border-dotted ">{link.pageTitle}</p>
              </td>
              <td className="py-4 p-10 sm:p-1">
                <a
                  href={link.shortURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {link.shortURL}
                </a>
              </td>
              <td className="p-10">
                <FaTrash />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  function CardsView() {
    return (
      <div className="flex flex-col w-full">
        {urlTable.map((link) => (
          <div key={link.shortURL} className="flex items-center justify-between border rounded-lg p-4 mb-4">
            <div className="flex-grow cursor-default hover:cursor-pointer" onClick={() => copyFn(link.destination)} title={link.destination}>
              <p className="border-b-2 border-white border-dotted">{link.pageTitle}</p>
            </div>
            <div className="ml-4">
              <a href={link.shortURL} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                {link.shortURL}
              </a>
            </div>
            <div className="ml-4" onClick={() => deleteLink(link.shortURL)}>
              <FaTrash />
            </div>
          </div>
        ))}
      </div>
    )
  }

}