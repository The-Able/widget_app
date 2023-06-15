import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Reimbursements() {
  const router = useRouter();
  const { id } = router.query;
  const [balances, setBalances] = useState<any[]>([])
  const [claims, setClaims] = useState<any[]>([])
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_SUMMIT_API}/balance/${id}`)
      setBalances(res.data)
      res = await axios.get(`${process.env.NEXT_PUBLIC_SUMMIT_API}/claims/${id}`)
      setClaims(res.data)
    }
    if(id) {
      getData()
    }
  }, [id])

  return (
    <div className='p-4'>
      <p className="text-xl text-sky-500 m-2 font-bold">Active Plans</p>
      <table className="shadow-lg bg-white">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan Type</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan Year Start</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan Year End</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {balances.filter(balance => new Date(balance['Plan Year Start']) < new Date() && new Date(balance['Plan Year End']) > new Date()).map((balance) => (
            <tr key={balance["ID"]}>
              <td className="border px-8 py-4">{balance['Plan Type']}</td>
              <td className="border px-8 py-4">{balance['Plan Year Start']}</td>
              <td className="border px-8 py-4">{balance['Plan Year End']}</td>
              <td className="border px-8 py-4">{balance['Available Balance']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xl text-stone-500 m-2 font-bold pt-6">Inactive Plans</p>
      <table className="shadow-lg bg-white">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan Type</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan Year Start</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan Year End</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {balances.filter(balance => new Date(balance['Plan Year Start']) > new Date() || new Date(balance['Plan Year End']) < new Date()).map((balance) => (
            <tr key={balance["ID"]}>
              <td className="border px-8 py-4">{balance['Plan Type']}</td>
              <td className="border px-8 py-4">{balance['Plan Year Start']}</td>
              <td className="border px-8 py-4">{balance['Plan Year End']}</td>
              <td className="border px-8 py-4">{balance['Available Balance']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xl text-cyan-500	 m-2 font-bold pt-6">Claims History</p>
      <table className="shadow-lg bg-white">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Claim ID</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Claimant</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Plan Year</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Service Date</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Entry Date</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Claim Amount</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Payable Amount</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Ineligible Amount</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Payment Method</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Provider</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim["ID"]}>
              <td className="border px-8 py-4">{claim["PlanName"]}</td>
              <td className="border px-8 py-4">{claim["Claim_ID"]}</td>
              <td className="border px-8 py-4">{claim["Claimant"]}</td>
              <td className="border px-8 py-4">{(new Date(claim["PlanYearStartDate"])).getFullYear()}</td>
              <td className="border px-8 py-4">{claim["DateOfServiceDate"]}</td>
              <td className="border px-8 py-4">{claim["EntryDate"]}</td>
              <td className="border px-8 py-4">{claim["ClaimAmount"]}</td>
              <td className="border px-8 py-4">{claim["PayableAmount"]}</td>
              <td className="border px-8 py-4">{claim["IneligibleAmount"]}</td>
              <td className="border px-8 py-4">{claim["MOP"]}</td>
              <td className="border px-8 py-4">{claim["Provider"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reimbursements;
