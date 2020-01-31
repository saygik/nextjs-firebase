import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import { collectionData } from 'rxfire/firestore';
import { Subject } from 'rxjs';
import fetch from 'isomorphic-unfetch';
import { takeUntil } from 'rxjs/operators';

import BookCard from '../../components/BookCard';
import {firestore, firebase} from '../../services/firebase/firebase'

const Books = () => {
    // state: {
    //     books: BookModel[];
    //     stopSubs: Subject<boolean>;
    //     firebase?: any;
    // } = {
    //     books: [],
    //     stopSubs: new Subject()
    // };
    const [books,setState]=useState(null)
    const [stopSubs]=useState(new Subject())
    useEffect(() => {
        async function createFirebase() {

            const booksRef = firestore.collection('books');
            collectionData(booksRef, 'bookId')
                .pipe(takeUntil(stopSubs))
                .subscribe(books => {
                    setState( books );
                });
        }
        createFirebase();
        return () => {
            stopSubs.next(true);
        }

    }, [])

    let loading = <CircularProgress />;
    if (books && books.length > 0) {
        loading = <span />;
    }
    return (
        <Grid container direction="row" justify="center">
            {loading}
            {books && books.map((book) => {
                return <BookCard book={book} key={book.id} />;
            })}
        </Grid>
    );
}

Books.getInitialProps = async ({ req }) => {
    const res = await fetch('https://api.github.com/repos/developit/preact')
    const json = await res.json()
    return { stars: json.stargazers_count }
}

export default Books
// async Books.getInitialProps() {
//     const res = await fetch(`${process.env.API_ENDPOINT}books`);
//     const books = await res.json();
//     return { books: books };
// }
