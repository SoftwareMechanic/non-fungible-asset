"use client"

import Navbar from '@/app/components/Navbar/Navbar';
import GenerateSensorData from '@/app/components/GenerateSensorData/GenerateSensorData';

export default function GenerateData(id) {

  return (
    <div>
      <Navbar />
      <GenerateSensorData />
    </div>
    
  );
}