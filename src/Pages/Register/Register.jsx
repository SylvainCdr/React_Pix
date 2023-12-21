import { useState } from 'react'
import './style.scss'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')

    // Ici dans les params je recupere l'evennement onSubmit (la variable "e")
    const handleSubmit = (e) => {
        // Qui me permet d'annuler le comportement par defaut d'HTML et des formulaires qui est de recharger la page
        // après la soumission
        e.preventDefault()

        // Ensuite je crée un objet qui regroupe toutes les infos de mon utilisateur qui viens de s'inscrire
        let user = {
            email,
            password,
            lastName,
            firstName
        }


        fetch("http://localhost:3001/register", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            // En cas d'erreur (que ce soit serveur, validation de donnée)
            // Je console log mes erreurs
            // Si c'est des erreurs de validation, je devrais les afficher
            .catch(error => console.log(error))
    }

    return (
        // J'ecoute l'evennement onSubmit qui s'execute quand on soumet le formulaire (que ce soit avec la touche entrée ou le bouton envoyer)
        // Et l'evennement appel ma fonction handleSubmit
        <form className='login' onSubmit={handleSubmit}>
            <label htmlFor="lastName">Nom</label>
            {/* Pour chaques input, j'ecoute l'evennement onChange afin de mettre a jour ma variable en fonction de mon input */}
            {/* Ca permet d'avoir en temps réel le contenu de l'input dans ma variable correspondante */}
            {/* Pour recuperer le contenu de l'input, je recupère l'evennement (la variable "e") */}
            {/* Dans cet evennement, je recupère ma cible (donc l'input) puis sa valeur */}
            {/* et j'utilise le setLastName pour définir ma variable avec le contenu de mon input */}
            <input type="text" name="lastName" id="lastName" onChange={e => setLastName(e.target.value)} />
            <label htmlFor="firstName">Prénom</label>
            <input type="text" name="firstName" id="firstName" onChange={e => setFirstName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
            <button>Envoyer</button>
        </form>
    )
}