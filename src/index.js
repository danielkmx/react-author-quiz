import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore';

const authors = [

    {
        name: 'Mark Twain',
        imageUrl: 'images/Mark_twain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn', 'The French Revolution', 'King Arthur', 'Arabian Nights']
    },
    {
        name: 'ERNEST HEMINGWAY',
        imageUrl: 'images/ernest_hemingway.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Anna Karenina', 'Far away Long Ago', 'BuddenBrooks,Madame Bovary']
    },
    {
        name: 'ERIK LARSON',
        imageUrl: 'images/erik_larson.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['In the Garden of beats', 'The Devil in the White City', 'Thunderstruck, Lethal Passage']
    },
    {
        name: ' F. SCOTT FITZGERALD',
        imageUrl: 'images/scott_fitzgerald.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Cray Sunday', 'A new Leaf, The offshore Pirate', 'Bernice Bobs Her hair']
    }
]
function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const awnser = sample(fourRandomBooks);
    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === awnser))
    }
}
const state = {
    turnData: getTurnData(authors),
    highlight: 'white'
}
function AddAuthorForm({ match }) {
    return <div>
        <h1>Add Author</h1>
        <p>{JSON.stringify({ match })}</p>
    </div>
}
function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer)
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}
function App() {
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />;
}
function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={App} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </BrowserRouter>, document.getElementById('root'));

}
render();
registerServiceWorker();

