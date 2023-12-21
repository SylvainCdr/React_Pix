import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)

    // Ici dans les params je recupere l'evennement onSubmit (la variable "e")
    const handleSubmit = (e) => {
        // Qui me permet d'annuler le comportement par defaut d'HTML et des formulaires qui est de recharger la page
        // après la soumission
        e.preventDefault()

        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (typeof data == 'object') {
                    navigate('/')
                }
                console.log(data)
            })
            .catch(error => console.log(error))
    }

    return (
        // J'ecoute l'evennement onSubmit qui s'execute quand on soumet le formulaire (que ce soit avec la touche entrée ou le bouton envoyer)
        // Et l'evennement appel ma fonction handleSubmit
        <form className='login' onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            {/* Pour chaques input, j'ecoute l'evennement onChange afin de mettre a jour ma variable en fonction de mon input */}
            {/* Ca permet d'avoir en temps réel le contenu de l'input dans ma variable correspondante */}
            {/* Pour recuperer le contenu de l'input, je recupère l'evennement (la variable "e") */}
            {/* Dans cet evennement, je recupère ma cible (donc l'input) puis sa valeur */}
            {/* et j'utilise le setLastName pour définir ma variable avec le contenu de mon input */}
            <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
            <button>Envoyer</button>
            {/* Par defaut, logged est false, quand le formulaire n'est pas encore envoyé */}
            {/* Donc tant que logged est false, on affiche pas la div */}
            {logged !== false && (
                // Ensuite, si logged est vrai (donc par exemple si logged est un object, alors logged est vrai par defaut)
                // alors j'affiche la class success (pour mettre vert)
                // Si logged est faux (ou undefined), alors j'affiche la class error
                <div className={logged ? 'success' : 'error'}>
                    {/* Idem ici, si c'est vrai, j'affiche bonjour prenom nom, sinon j'affiche id incorrect */}
                    {logged ? `Bonjour ${logged.firstName} ${logged.lastName}` : "Identifiants incorrect"}
                </div>
            )}
        </form>
    )
}