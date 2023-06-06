import React, { useState } from "react";

import firebaseApp from "../../firebase/credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Login() {

  const firestore = getFirestore(firebaseApp);
  const [isRegistering, setIsRegistering] = useState(false);

  async function registerUser(email, password, rol) {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((FirebaseUser) => {
      return FirebaseUser;
    });

    console.log(userInfo.user.uid);
    const docuRef = doc(firestore, `usuarios/${userInfo.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    console.log("submit", email, password, rol);

    if (isRegistering) {
      // Checking
      registerUser(email, password, rol);
    } else {
      // login
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div>
      <h1>{isRegistering ? "Regístrate" : "Inicia sesión"}</h1>

      <form onSubmit={submitHandler}>
        <label>
          Correo electrónico:
          <input type="email" id="email" />
        </label>

        <label>
          Contraseña:
          <input type="password" id="password" />
        </label>

        <label>
          Rol:
          <select id="rol">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </label>

        <input
          type="submit"
          value={isRegistering ? "Registrar" : "Iniciar sesión"}
        />
      </form>

      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Ya tengo una cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}

export default Login;