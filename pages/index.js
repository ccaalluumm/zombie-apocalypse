import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home({ illnesses }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Illness List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Select an illness:</h1>
        <ul>
          {illnesses._embedded.illnesses.map((illness, index) => (
            <Link href={{ pathname: '/pain', query: {illness: illness.illness.name} }}>
              <a><li key={index}>{illness.illness.name}</li></a>
            </Link>
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

  // Return the illnesses so that they can be used as a prop
  return { props: { illnesses } }
}