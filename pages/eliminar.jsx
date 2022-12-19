import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Editar.module.css'

export default function Eliminar({ posts }) {
    const router = useRouter()
    const [id, setId] = useState(1)
    
    const handleId = (e)     => {
        setId(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
        })
    
        router.push('/')
    }
    
    return (
        <main className={styles.main}>
        <div className={styles.loginbox}>
            <h2>Eliminar mascota</h2>
            <form>
            <label>Nombre</label>
            <div className={styles.userbox}>
    
                <select className={styles.select} defaultValue={id} onChange={handleId} name="id" id="id">
                {posts.map((post) => (
                    <option className={styles.option} key={post.id} value={post.id}>
                    {post.name}
                    </option>
                ))}
                </select>
            </div>
            <input onClick={handleSubmit} type="submit" name="" value="Eliminar" />
            </form>
        </div>
        </main>
    )
    }

    export async function getStaticProps() {
        // Call an external API endpoint to get posts.
        // You can use any data fetching library
        const res = await fetch('https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets')
        const posts = await res.json()
      
        // By returning { props: { posts } }, the Blog component
        // will receive `posts` as a prop at build time
        return {
          props: {
            posts,
          },
        }
      }