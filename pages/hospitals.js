import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Hospitals({ hospitals }) {
    console.log(hospitals)
    const router = useRouter();
    const levelOfPain = router.query["pain"];
    // Sort the hospitals based on waiting time
    const averageProcessTime = "averageProcessTime";
    const patientCount = "patientCount";
    let hospitalz = hospitals.sort(getSortOrder(averageProcessTime, patientCount, levelOfPain));

    return (
        <div className={styles.container}>
        <Head>
          <title>Suggested Hospitals</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1>Suggested hospitals:</h1>
            <ul>
                {hospitalz.map((hospital) => (
                    <a><li key={hospital.id}>{hospital.name}</li></a>
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

function getSortOrder(prop1, prop2, levelOfPain) {
    console.log(prop1);
    return function(x, y) {
        if (x["waitingList"][levelOfPain][prop1] * x["waitingList"][levelOfPain][prop2] < y["waitingList"][levelOfPain][prop1] * y["waitingList"][levelOfPain][prop2]) {
            return 1;
        } else {
            return -1;
        }
    }
}