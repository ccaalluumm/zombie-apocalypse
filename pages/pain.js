import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router'

export default function Pain() {
    const router = useRouter()
    const painLevels = [
        {
            id: 0,
            description: "No pain"
        },
        {
            id: 1,
            description: "Discomforting"
        },
        {
            id: 2,
            description: "Distressing"
        },
        {
            id: 3,
            description: "Severe"
        },
        {
            id: 4,
            description: "Intense"
        },
    ];

    return (
        <div className={styles.container}>
            <Head>
            <title>Pain Levels</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
            <h1>Select a pain level ({router.query["illness"]}):</h1>
            <ul>
                {painLevels.map(painLevel => (
                    <Link href={{pathname: "/hospitals", query: {illness: router.query["illness"], pain: painLevel.id}}} key={painLevel.id}>
                        <a><li key={painLevel.id}>{painLevel.description}</li></a>
                    </Link>
                ))}
            </ul>
            </main>
        </div>
    )
}
