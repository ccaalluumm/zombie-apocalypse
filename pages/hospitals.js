import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';


export default function Hospitals({ hospitals }) {
    const router = useRouter();
    const levelOfPain = router.query["pain"];
    const illness = router.query["illness"];

    const createPatient = async (illness, levelOfPain, hospital) => {
        console.log("REQ DATA:\n" + illness + "\n" + levelOfPain);
        try {
            fetch('http://zombie-apocalypse.vercel.app/api/patients', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({illness: illness, pain: levelOfPain, hospital: hospital})
            })
        } catch (error) {
            console.log(error);
        }
    }

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
                    <Link href="/api/patients" key={hospital.id}>
                        <a>
                            <li key={hospital.id} onClick={() => createPatient(illness, levelOfPain, hospital.name)}>
                                <strong>{hospital.name}</strong>: {calculateWaitTime(hospital, levelOfPain)} 
                            </li>
                        </a>
                    </Link>
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


