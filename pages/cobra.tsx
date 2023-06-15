import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Cobra() {
  const router = useRouter();
  const { id } = router.query;
  const [cobras, setCobras] = useState<any[]>([])
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_SUMMIT_API}/cobra/${id}`)
      setCobras(res.data)
    }
    if(id) {
      getData()
    }
  }, [id])

  return (
    <div className='p-4'>
      {/* <p className="text-xl text-sky-500 m-2 font-bold">Cobra QE</p> */}
      <table className="shadow-lg bg-white">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">Benefit</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Coverage</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Participants</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Benefit Tier</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Qualifying Event</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Last Day to Accept</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Election Form Sent</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Qualifying Event Date</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Premium</th>
            <th className="bg-blue-100 border text-left px-8 py-4">COBRA Start Date</th>
            <th className="bg-blue-100 border text-left px-8 py-4">COBRA End Date</th>
          </tr>
        </thead>
        <tbody>
          {cobras.map((cobra) => (
            <tr key={cobra["ID"]}>
              <td className="border px-8 py-4">{cobra['BenefitName']}</td>
              <td className="border px-8 py-4">{cobra['Coverage']}</td>
              <td className="border px-8 py-4">{cobra['ParticipantName']}</td>
              <td className="border px-8 py-4">{cobra['BenefitTier']}</td>
              <td className="border px-8 py-4">{cobra['QualifyingEvent']}</td>
              <td className="border px-8 py-4">{cobra['LastDayToAccept']}</td>
              <td className="border px-8 py-4">{cobra['ElectionFormSent']}</td>
              <td className="border px-8 py-4">{cobra['QualifyingEventDate']}</td>
              <td className="border px-8 py-4">{cobra['Premium']}</td>
              <td className="border px-8 py-4">{cobra['CobraStartDate']}</td>
              <td className="border px-8 py-4">{cobra['CobraExpires']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cobra;
