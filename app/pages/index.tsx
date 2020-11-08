import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'

export default function Home() {
  return (
    <html>
      <title>Hello</title>
      <body>
        <h1>Hello world</h1>
      </body>
    </html>
  )
}
