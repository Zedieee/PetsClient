import styles from '../styles/Editar.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import GoBack from '../components/goback'
export default function Crear() {
    const router = useRouter()
    const [name, setName] = useState(null)
    const [age, setAge] = useState(null)
    const [description, setDescription] = useState(null)
    const [image_pet, setImage_pet] = useState('')

    const handleAge = (e) => {
        setAge(e.target.value)
      
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
       
       }
    const handleName = (e) => {
        setName(e.target.value)

    }
    const handleImage = (e) => {
        setImage_pet(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const res = await axios.post('https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets', {
            name,
            age,
           image_pet,
            description
        })
        console.log(res.data)
        router.push('/')

    }

    return (
        <main className={styles.main}>
            <div  className={styles.description}>
            <GoBack />
            </div >
            <div className={styles.loginbox}>
                <h2>Crear mascota</h2>
                <form>
                    
                    <div className={styles.userbox}>
                        <input onChange={handleName} type="text" name="" required />
                        <label>Nombre</label>
                    </div>
                    
                    <div className={styles.userbox}>
                        <input onChange={handleAge} type="number" min={0} max={100} name="" required />
                        <label>Edad</label>
                    </div>
                    
                    <div className={styles.userbox}>
                        <input onChange={handleDescription} type="text" name="" required />
                        <label>Descripción</label>
                    </div>
                 
                    <div className={styles.userbox}>
                        <input onChange={handleImage} type="text" name="" required />
                        <label>Link de imagen</label>
                    </div>
                    <button onClick={handleSubmit} className={styles.button23} role="button">Guardar</button>
                
                </form>
            </div>
        </main>
    )
}
