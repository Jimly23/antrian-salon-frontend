import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/userApi';
import { getQueues, updateQueueStatus } from '../api/queueApi';

import jsPDF from "jspdf";
import "jspdf-autotable";


const printDaftarAntrian = (title, allQueue) => {
    const doc = new jsPDF();
  
    // Header
    doc.text(`Laporan ${title} Antrian SalonKu.`, 105, 10, { align: "center" });
  
    const tableData = allQueue.map((item, index) => [
      index + 1,
      item.username,
      item.telepon,
      item.queue,
      item.date,
      item.estimationQueue,
      item.status,
    ]);
  
    doc.autoTable({
      head: [["NO", "NAMA", "TELEPON", "NO. ANTRI", "TANGGAL", "ESTIMASI", "STATUS"]],
      body: tableData,
      theme: "grid",
      styles: { halign: "center" },
    });
  
    doc.save("Laporan_Data_User_SalonKu.pdf");
};

const printDaftarUser = (allUser) => {
    const doc = new jsPDF();
  
    // Header
    doc.text(`Laporan Data User Antrian SalonKu.`, 105, 10, { align: "center" });
  
    const tableData = allUser.map((item, index) => [
      index + 1,
      item.username,
      item.email,
      item.telepon,
    ]);
  
    doc.autoTable({
      head: [["NO", "NAMA", "EMAIL", "TELEPON"]],
      body: tableData,
      theme: "grid",
      styles: { halign: "center" },
    });
  
    doc.save("Laporan_Antrian_SalonKu.pdf");
};

const Manager = () => {
    const [isOpen, setIsOpen] = useState(1);
    const [allUser, setAllUser] = useState([]);
    const [allQueue, setAllQueue] = useState([]);
    const [queueSuccess, setQueueSuccess] = useState(0);

    useEffect(()=>{
        getAllUser();
        getAllQueue();
    }, [])

    const getAllUser = async () => {
        const response = await getUsers();
        console.log(response.users)
        setAllUser(response.users);
    }

    const getAllQueue = async () => {
        const response = await getQueues();
        const success = response.queue.filter((queue) => queue.status === 'Success');

        setQueueSuccess(success.length);
        setAllQueue(response.queue);
    }

    const handleUpdateStatus = async (id) => {
       const response = await updateQueueStatus({id: id});
       getAllQueue();
    }

  return (
    <>
        <div className='relative'>
            <div className='sidebar z-10 fixed top-0 left-0 right-0 bg-green-600 flex items-center justify-between'>
                <h3 className='font-medium text-xl text-white p-5'>Pemilik</h3>
                <ul className='font-medium flex items-center text-sm'>
                    <li onClick={()=>setIsOpen(1)} className='text-white cursor-pointer py-3 px-4'>Daftar Antrian</li>
                    <li onClick={()=>setIsOpen(2)} className='text-white cursor-pointer py-3 px-4'>Riwayat Antrian</li>
                    <li onClick={()=>setIsOpen(3)} className='text-white cursor-pointer py-3 px-4'>Daftar User</li>
                </ul>
            </div>
            <div className='bg-slate-100 p-5 h-screen pt-24'>
                {isOpen == 1 && 
                    <>
                        <>
                            <div className="grid bg-white grid-cols-3 gap-x-10 py-5 mb-10 mt-2 text-center font-medium">
                                <div className="w-full h-[100px] p-5">
                                    <h5 className="text-lg">Total</h5>
                                    <p className='text-3xl'>{allQueue.length}</p>
                                </div>
                                <div className="w-full h-[100px] p-5 border-l border-r">
                                    <h5 className="text-lg">Antrian Saat Ini</h5>
                                    <p className='text-3xl'>{allQueue.length == 0? 0 : allQueue.length == queueSuccess? allQueue.length: queueSuccess + 1}</p>
                                </div>
                                <div className="w-full h-[100px] p-5">
                                    <h5 className="text-lg">Selesai</h5>
                                    <p className='text-3xl'>{queueSuccess}</p>
                                </div>
                            </div>
                        </>
                        <>
                            <div className="print-header hidden">
                                <h1>Nama Aplikasi</h1>
                                <p id="print-date"></p>
                            </div>
                            <div className='flex items-center justify-between mb-3'>
                              <h3 className='font-medium text-xl mb-2'>Daftar Antrian</h3>
                              <button  onClick={() => printDaftarAntrian('',allQueue)} className='px-4 py-1 text-sm rounded bg-green-600 text-white'>
                                Cetak
                              </button>
                            </div>
                            <div className="w-full bg-white  p-5 shadow">
                                <div className="header bg-green-600 grid grid-cols-6 text-center font-medium text-white mb-6 h-10 flex items-center">
                                    <h6>Nama</h6>
                                    <h6>Telepon</h6>
                                    <h6>No. Antri</h6>
                                    <h6>Tanggal</h6>
                                    <h6>Estimasi</h6>
                                    <h6>Status</h6>
                                </div>
                                <div className='daftar-antrian max-h-[1000px]'>
                                    {allQueue.map((item, index) => (    
                                        <div key={index} className="grid text-center items-center text-sm grid-cols-6 font-medium text-slate-700 my-3">
                                            <h6>{item.username}</h6>
                                            <h6>{item.telepon}</h6>
                                            <h6>{item.queue}</h6>
                                            <h6>{item.date}</h6>
                                            <h6>{item.estimationQueue}</h6>
                                            <div className={`py-1 px-3 w-[120px] mx-auto rounded-md ${item.status === 'Success' ? 'text-green-500 cursor-no-drop' : 'text-orange-500'} font-medium cursor-pointer`}>
                                                {item.status}
                                            </div>
                                        </div> 
                                    ))}
                                </div>
                            </div>
                        </>
                    </>
                }

                {isOpen === 2 && 
                    <> 
                        <>
                            <div className="grid grid-cols-3 gap-x-10 pb-10 pt-2 font-medium text-center">
                                <div className="bg-white border w-full h-[100px] p-5">
                                    <h5 className="text-lg">Riwayat Antrian</h5>
                                    <p className='text-3xl'>{queueSuccess}</p>
                                </div>
                            </div>
                        </>
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className='font-medium text-xl mb-2'>Daftar Antrian</h3>
                            <button onClick={() => printDaftarAntrian('Riwayat',allQueue)} className='px-4 py-1 text-sm rounded bg-green-600 text-white'>Cetak</button>
                        </div>
                        <div className="w-full bg-white p-5 shadow text-center">
                            <div className="header bg-green-600 grid grid-cols-6 text-center font-medium text-white mb-6 h-10 flex items-center">
                                <h6>Nama</h6>
                                <h6>Telepon</h6>
                                <h6>No. Antri</h6>
                                <h6>Tanggal</h6>
                                <h6>Estimasi</h6>
                                <h6>Status</h6>
                            </div>
                            <div className='max-h-[1000px] riwayat-antrian'>
                                {allQueue.map((item, index) => (   
                                    <div key={index}>
                                        {item.status === 'Success' && 
                                            <div key={index} className="grid items-center text-sm grid-cols-6 font-medium text-slate-700 mb-3">
                                                    <h6>{item.username}</h6>
                                                    <h6>{item.telepon}</h6>
                                                    <h6>{item.queue}</h6>
                                                    <h6>{item.date}</h6>
                                                    <h6>{item.estimationQueue}</h6>
                                                    <div className={`py-1 px-3 mx-auto w-[120px] rounded-md ${item.status === 'Success' ? 'text-green-500 cursor-no-drop' : 'text-orange-500'} font-medium cursor-pointer`}>
                                                        {item.status}
                                                    </div>
                                            </div> 
                                        }
                                    </div> 
                                ))}
                            </div>
                        </div>
                    </>
                }

                {isOpen === 3 && 
                    <>
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className='font-medium text-xl mb-2'>Daftar Antrian</h3>
                            <button onClick={() => printDaftarUser(allUser)} className='px-4 py-1 text-sm rounded bg-green-600 text-white'>Cetak</button>
                        </div>
                        <div className="daftar-antrian w-full bg-white p-5 shadow text-center">
                            <div className="header bg-green-600 grid grid-cols-4 text-center font-medium text-white mb-6 h-10 flex items-center">
                                <h6>No.</h6>
                                <h6 >Nama</h6>
                                <h6 >Email</h6>
                                <h6>Telepon</h6>
                            </div>
                            <div className='max-h-[1000px] overflow-y-scroll'>
                                {allUser.map((item,index) => (
                                    <div key={index} className="grid items-center text-sm grid-cols-4 font-medium text-slate-700 mb-3">
                                        <h6>{index + 1}</h6>
                                        <h6 >{item.username}</h6>
                                        <h6 >{item.email}</h6>
                                        <h6>{item.telepon}</h6>
                                    </div> 
                                    
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default Manager