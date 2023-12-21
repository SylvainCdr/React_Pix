import { useState } from "react"

export default function Contact() {

    // En premier, je commence par créer un state par input (par champs) de mon formulaire
    // Cela servira a lier les variables (states) aux input et les mettre a jour en temps reel

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')


    // Ici je crée ma fonction handleSubmit qui me permet de gérer l'envois du formulaire
    // Que ce soit via le bouton envoyer ou en appuyant sur la touche Entrée du clavier
    // Je met le "e" en parametre de ma fonction pour récupérer l'evennement de l'envois du formulaire
    const handleSubmit = (e) => {
        // Cet evennement me sert, dans ce cas, uniquement à annuler le comportement par defaut de HTML
        // Qui recharge la page lors de la soumission d'un formulaire
        // Le e.preventDefault() permet d'annuler ce comportement
        e.preventDefault()

        console.log(firstName, lastName, email, message)

        // Je fais un fetch afin d'envoyer le contenu de mon formulaire à mon API
        // Le premier argument de fetch est toujours l'URL de mon API et le 2eme est un objet de configuration
        fetch("http://localhost:3001/contact", {
            method: "POST", // Ici nous pouvons définir la methode, par defaut GET, de notre fetch
            headers: { // Nous pouvons egalement ajouter un objet dans les Headers afin de définir certaines information
                // tel que le type de contenu, ou l'autorisation si nous avons une API sécurisé
                "Content-Type": "application/json",
            },
            // Enfin, nous allons définir le body de notre fetch
            // Cela va permettre de préciser quels variable nous voulons envoyer à notre back-end
            // Nous utilisons JSON.stringify car nous envoyons du JSON à notre API, et nous devons l'envoyer sous forme de chaine de caractere
            // Nous ne pouvons pas envoyer directement d'objet JS via l'API
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                message
            }),
        }).then(() => {
            //Apres l'envois, je remet toutes mes variables à 0 afin de vider le formulaire
            setFirstName('')
            setLastName('')
            setEmail('')
            setMessage('')
        })
    }

    return (
        // Je précise que si le formulaire est envoyé, celui ci doit appeler la fonction handleSubmit
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="firstName">Prenom</label>
            {/* Pour chaques input, je définis value avec la variable qui lui est définie afin de mettre */}
            {/* J'ajoute aussi l'evennement onChange pour définir ma variable (state) à chaque changement de l'input */}
            <input type="text" value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} />

            <label htmlFor="lastName">Nom</label>
            <input type="text" value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="message">Message</label>
            <textarea name="message" value={message} id="message" cols="30" rows="10" onChange={(e) => setMessage(e.target.value)} ></textarea>

            <button>Envoyer</button>
        </form>
    )
}