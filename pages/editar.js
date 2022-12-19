import styles from '../styles/Editar.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Editar({ posts }) {
  const router = useRouter()
  const [name, setName] = useState(null)
  const [age, setAge] = useState(null)
  const [description, setDescription] = useState(null)
  const [id, setId] = useState(1)

  const handleId = (e) => {
    setId(e.target.value)
  }

  const handleAge = (e) => {
    setAge(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name,
        age,
        description
      })
    })

    router.push('/')
  }

  return (
    <main className={styles.main}>
      <div className={styles.loginbox}>
        <h2>Actualizar mascota</h2>
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
          <div className={styles.userbox}>
            <input onChange={handleName} type="text" name="nombre" />
            <label>Nuevo nombre</label>
          </div>
          <div className={styles.userbox}>
            <input onChange={handleAge} type="number" min={0} max={100} name="Age" />
            <label>Edad</label>
          </div>
          <div className={styles.userbox}>
            <input onChange={handleDescription} type="text" name="Descripcion" />
            <label>Descripcion</label>
          </div>
          <button onClick={handleSubmit} className={styles.button23} role="button">Guardar</button>
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