import React, { useState, useEffect } from 'react';
import '../pagestyles/Aufgabe4.css';

function Aufgabe4() {

    // URL of the API: https://jsonplaceholder.typicode.com/comments
    // example of fetching data with useSWR: https://blog.logrocket.com/handling-data-fetching-next-js-useswr/

    // each json object has the following structure:
    // postID: number
    // id: number
    // name: string
    // email: string
    // body: string

    // fetch the data from the API
    // store the data in a state variable
    // display the first 10 comments
    // display the name, email, and body of each comment

    const [comments, setComments] = useState([]);

    // images from public/assets/aufgab4assets/animal_images
    // bear.png
    // crocodile.png
    // deer.png
    // elephant.png
    // horse.png
    // lion.png
    // monkey.png
    // rabbit.png
    // tiger.png
    // choosing one randomly and giving it to the comment pheno

    const images = [
        'bear.png', 'crocodile.png', 'deer.png', 'elephant.png',
        'horse.png', 'lion.png', 'monkey.png', 'rabbit.png', 'tiger.png'
    ];

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => {
                const commentsWithImages = data.slice(0, 10).map(comment => ({
                    ...comment,
                    image: images[Math.floor(Math.random() * images.length)]
                }));
                setComments(commentsWithImages);
            });
    }, []);

    return (
        <div className="aufgabe4-container">
            <h1>Aufgabe 4: Die ersten zehn Kommentare</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <img src={`/assets/animals_images/images/${comment.image}`} alt={comment.image}/>
                        <h2>{comment.name}</h2>
                        <p><strong>Email:</strong> {comment.email}</p>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Aufgabe4;