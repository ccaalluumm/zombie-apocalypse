import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Hospitals({ hospitals }) {
    return (
        <div className={styles.container}>
        <Head>
          <title>Suggested Hospitals</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1>Suggested hospitals:</h1>
            <ul>
                {hospitals._embedded.hospitals.map((hospital) => (
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
    const hospitals = await res.json()

    // Return the hospitals so that they can be used as a prop
    return { props: { hospitals } }
}