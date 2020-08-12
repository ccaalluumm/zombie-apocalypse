import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Hospitals({ hospitals }) {
    const router = useRouter();
    const levelOfPain = router.query["pain"];

    // Sort the hospitals based on waiting time
    hospitals.sort(GetSortOrder(levelOfPain));

    return (
        <div className={styles.container}>
        <Head>
          <title>Suggested Hospitals</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1>Suggested hospitals:</h1>
            <ul>
                {hospitals.map((hospital) => (
                    <li key={hospital.id}>
                        {hospital.name}
                    </li>
                ))}
            </ul>
        </main>
      </div>
    )
}

export async function getServerSideProps() {
    // Call the external API requesting the list of available hospitals
    const res = await fetch("http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals")
    const data = await res.json()
    const hospitals = data["_embedded"]["hospitals"];

    // Return the hospitals so that they can be used as a prop
    return { props: { hospitals } }
}

function GetSortOrder(pain) {
    return function(a, b) {    
        if (a["waitingList"][pain]["patientCount"] * a["waitingList"][pain]["averageProcessTime"] > b["waitingList"][pain]["patientCount"] * b["waitingList"][pain]["averageProcessTime"]) {    
            return 1;    
        } else if (a["waitingList"][pain]["patientCount"] * a["waitingList"][pain]["averageProcessTime"] < b["waitingList"][pain]["patientCount"] * b["waitingList"][pain]["averageProcessTime"]) {    
            return -1;    
        }    
        return 0;    
    }    
}   