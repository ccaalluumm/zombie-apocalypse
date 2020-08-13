import Head from 'next/head'

import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

export default function Hospitals({ hospitals }) {
    const router = useRouter();
    const levelOfPain = router.query["pain"];

    // Sort the hospitals based on waiting time
    hospitals.sort(getSortOrder(levelOfPain));

    return (
        <div className={styles.container}>
        <Head>
          <title>Suggested Hospitals</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1>Suggested hospitals (waiting time):</h1>
            <ul>
                {hospitals.map((hospital) => (
                    <li key={hospital.id}>
                        <strong>{hospital.name}</strong>: {calculateWaitTime(hospital, levelOfPain)} 
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

function getSortOrder(pain) {
    return function(a, b) {
        if (getTotalWaitTime(a, pain) > getTotalWaitTime(b, pain)) {    
            return 1;    
        } else if (getTotalWaitTime(a, pain) < getTotalWaitTime(b, pain)) {    
            return -1;    
        }    
        return 0;
    }    
}

function getTotalWaitTime(hospital, levelOfPain) {
    return hospital["waitingList"][levelOfPain]["patientCount"] * hospital["waitingList"][levelOfPain]["averageProcessTime"];
}

function calculateWaitTime(hospital, levelOfPain) {
    const patientCount = hospital["waitingList"][levelOfPain]["patientCount"];
    const averageProcessTime = hospital["waitingList"][levelOfPain]["averageProcessTime"];
    const waitTime = patientCount * averageProcessTime;

    // Calculate the number of hours and minutes - return only hours if total minutes fits into a whole number of hours
    if (waitTime >= 60) {
        return waitTime % 60 != 0 ? Math.floor(waitTime / 60) + " hours, " + waitTime % 60 + " mins" : Math.floor(waitTime / 60) + " hours"
    }

    // Minutes is less than 60, so just return the total minute
    return waitTime + " mins";
}
