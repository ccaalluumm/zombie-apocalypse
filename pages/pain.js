import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router'

export default function Pain() {
const router = useRouter()
const painLevels = ["No pain", "Discomforting", "Distressing", "Intense"].map((painLevel) => <Link href={{pathname: "/hospitals", query: {illness: router.query["illness"], pain: painLevel}}}><a><li>{painLevel}</li></a></Link>)

    return (
        <div className={styles.container}>
            <Head>
            <title>Pain Level</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main className={styles.main}>
            <h1>Select a pain level:</h1>
            <ul>
                { painLevels }
            </ul>
            </main>
        </div>
    )
}