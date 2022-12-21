import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Editar.module.css'
import axios from 'axios'
import GoBack from '../components/goback'

export default function Eliminar() {
    const router = useRouter()
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
  
    const handleId = (e)     => {
        setId(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.delete(`https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets/${id}`)
        

    
        router.push('/')
    }
    
    return (
        <main className={styles.main}>
                            <div  className={styles.description}>
            <GoBack />
            </div >
        <div className={styles.loginbox}>
            <h2>Eliminar mascota</h2>
            <form>
            <label>Nombre</label>
            <div className={styles.userbox}>
    
                <select className={styles.select} defaultValue={id} onChange={handleId} name="id" id="id">
                {Object.keys(data).map((key) => {
                    return (
                    <option className={styles.option} key={key} value={data[key].id}>
                        {data[key].name}
                    </option>
                    )
                })
                }
                </select>
            </div>
            <input className={styles.button23} onClick={handleSubmit} type="submit" name="" value="Eliminar" />
            </form>
        </div>
        </main>
    )
    }