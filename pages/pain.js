import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Pain() {
    return (
        <div className={styles.container}>
            <Head>
            <title>Pain Level</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main className={styles.main}>
            <h1>Select a pain level:</h1>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
    
            </main>
        </div>
    )
}