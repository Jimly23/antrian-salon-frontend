import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner.jpg";
import Button from "../atoms/Button";
import { FaRegClock } from "react-icons/fa6";
import { HiMiniUser, HiMiniUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { getQueues } from "../../api/queueApi";

const Hero = () => {
  return (
    <div className="bg-slate-50 h-screen relative">
      <div className="absolute z-[10] inset-0 flex items-center justify-center p-16 pt-24">
        <div className="max-w-[1240px] border bg-white w-full h-full rounded-xl flex items-center">
          <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
            <div className="py-20">
              <div className="relative text-center">
                <div className="px-5 py-2 border border-slate-300 bg-green-50 inline-block rounded-full text-sm">Buka Setiap Hari | 08:00 - 20:00</div>
                <h4 className="text-4xl font-bold text-slate-700 mt-12">
                <span><h5 className='text-4xl font-bold '>Salon<span className="text-green-600">Ku</span>.</h5></span>
                Kemudahan Antrian, Untuk Perawatan Impian!
                </h4>
                <p className="my-5 text-slate-700 font-medium max-w-[600px] mx-auto">
                Antri lebih mudah, hemat waktu, dan nikmati perawatan salon tanpa menunggu lama!
                </p>
                <div className="cta-box w-[150px] mx-auto mt-16">
                    <Link to={'/antri'}><Button text={"Mulai Antri"} style={'bg-green-600  rounded-lg'}/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
