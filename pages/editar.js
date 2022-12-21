import styles from '../styles/Editar.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import GoBack from '../components/goback'
export default function Editar() {
  const router = useRouter()
  const [name, setName] = useState(null)
  const [age, setAge] = useState(null)
  const [description, setDescription] = useState(null)
  const [id, setId] = useState(1)
  const [data, setData] = useState([])

  const response = async () => {
    const res = await axios.get('https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets')
    setData(res.data)
    console.log(res.data)
  } 

    useEffect(() => {
      response()
    }, [])

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
    
    const res = await axios.patch(`https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets/${id}`, {
      id,
      name,
      age,
      description
    })
    

    
    router.push('/')
  }

  return (
    <main className={styles.main}>
      <div  className={styles.description}>
            <GoBack />
      </div >
      <div className={styles.loginbox}>
        <h2>Actualizar mascota</h2>
        <form>
          <label>Nombre</label>

          <div className={styles.userbox}>

            <select className={styles.select} defaultValue={id} onChange={handleId} name="id" id="id">
              {data && Object.keys(data).map((key) => {
                return (
                  <option className={styles.option} key={data[key].id} value={data[key].id}>
                  {data[key].name}
                </option>
                )
              })
              } 
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

