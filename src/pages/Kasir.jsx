import React, { useEffect, useState } from "react";
import { HiMiniUser, HiMiniUserGroup } from "react-icons/hi2";
import Button from "../components/atoms/Button";
import { getQueues, updateQueueStatus } from "../api/queueApi";

const Kasir = () => {
  const [allQueue, setAllQueue] = useState(0);
  const [queueData, setQueueData] = useState([])
  const [queueSuccess, setQueueSuccess] = useState(0);

  useEffect(()=>{
    getAllQueue();
  },[])

  const getAllQueue = async () => {
    const queues = await getQueues();
    const success = queues.queue.filter((queue) => queue.status === 'Success');
    
    setQueueSuccess(success.length);
    setAllQueue(queues.queue.length);

    let queueId = []
    for(let i=0; i<queues.queue.length; i++){
      queueId.push(queues.queue[i].id)
    }
    setQueueData(queueId)
  }

  const handleUpdateStatus = async () => {
    console.log(queueData[queueSuccess]);
    const response = await updateQueueStatus(queueData[queueSuccess]);
    console.log(response);
    getAllQueue();
  }

  return (
    <div className="bg-slate-100 pt-20 h-screen">
      <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
        <h4 className="text-center text-4xl font-bold text-slate-700">Kasir SalonKu.</h4>
        <div className='w-[750px] mx-auto font-medium bg-white shadow mt-10 grid grid-cols-3 gap-2 p-5 text-center'>
          <div className="bg-white border w-full p-5">
            <h5 className="text-lg">Jumlah Antrian</h5>
            <div className="w-16 h-16 rounded-lg mt-5 text-white bg-red-500 mx-auto flex items-center justify-center">
              <p className="text-3xl">{allQueue}</p>
            </div>
          </div>
          <div className="bg-white border w-full p-5">
            <h5 className="text-lg">Antrian Saat Ini</h5>
            <div className="w-16 h-16 rounded-lg mt-5 text-white bg-orange-500 mx-auto flex items-center justify-center">
              <p className="text-3xl">{allQueue == 0? 0 : allQueue == queueSuccess? allQueue: queueSuccess + 1}</p>
            </div>
          </div>
          <div className="bg-white border w-full p-5">
            <h5 className="text-lg">Selesai</h5>
            <div className="w-16 h-16 rounded-lg mt-5 text-white bg-green-600 mx-auto flex items-center justify-center">
              <p className="text-3xl">{queueSuccess}</p>
            </div>
          </div>

          <div onClick={handleUpdateStatus} className='text-center mt-5 col-span-3'>
            <button className="py-1 px-5 rounded-lg bg-green-600 text-white">Berikutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kasir;
