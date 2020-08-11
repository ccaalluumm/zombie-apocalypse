import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ illnesses }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zombie Hosptial List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          {illnesses._embedded.illnesses.map((illness, index) => (
            <li key={index}>{illness.illness.name}</li>
          ))}
        </ul>

      </main>
    </div>
  )
}

export async function getServerSideProps() {
  // Call the external API containing the known illnesses
  const res = await fetch('http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses')
  const illnesses = await res.json()

  // Pass the illnesses so that they can be used as a prop at build time
  return { props: { illnesses } }
}