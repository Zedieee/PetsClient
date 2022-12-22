import styles from "../styles/Editar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import GoBack from "../components/goback";
export default function Crear() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [description, setDescription] = useState(null);
  const [image_pet, setImage_pet] = useState("");
  const [setted, setSetted] = useState(false);


  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "wx2e9n6q");
    axios.post("https://api.cloudinary.com/v1_1/dpu6swtkx/image/upload", formData).then((res) => {
        setImage_pet(res.data.secure_url);
        setSetted(true);
  });
   
        
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
        "https://nodejs-mysql-restapi-pets-production.up.railway.app/api/pets",
        {
          name,
          age,
          image_pet,
          description,
        }
      );
      router.push("/");
 
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <GoBack />
      </div>
      <div className={styles.loginbox}>
        <h2>Crear mascota</h2>
        <form >
          <div className={styles.userbox}>
            <input onChange={handleName} type="text" name="" required />
            <label>Nombre</label>
          </div>

          <div className={styles.userbox}>
            <input
              onChange={handleAge}
              type="number"
              min={0}
              max={100}
              name=""
              required
            />
            <label>Edad</label>
          </div>

          <div className={styles.userbox}>
            <input onChange={handleDescription} type="text" name="" required />
            <label>Descripción</label>
          </div>

          <div className={styles.custominputfile}>
            <input
              type="file"
                name="image_pet"
              id="image_pet"
              className={styles.inputfile}
              value=""
                onChange={(event) =>{
                    handleImage(event.target.files);
                }}
            />
            Subir imagen
          </div>
          <button
            onClick={handleSubmit}
            className={styles.button23}
            role="button"
            disabled={!setted}
          >
            Guardar {setted ? "✔" : ""}
          </button>
        </form>
      </div>
    </main>
  );
}
