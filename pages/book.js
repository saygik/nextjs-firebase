import Grid from '@material-ui/core/Grid';
import fetch from 'isomorphic-unfetch';
import { NextRouter, withRouter } from 'next/router';
import { Component } from 'react';
import { docData } from 'rxfire/firestore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import BookDetail from '../src/components/BookDetail';
import BookPage from '../src/components/BookPage';
import ChapterDetail from '../src/components/ChapterDetail';
import loadFirebase from '../src/services/firebase/firebase';


class book extends Component {

    static async getInitialProps({ req, query }) {
        const id = query.id ? query.id : null;
        const chapterId = query.chapterId ? query.chapterId : null;
        const pageId = query.pageId ? query.pageId : null;

        const retObj = {
            book: {
                id: id
            },
            chapter: {
                id: chapterId
            },
            page: {
                id: pageId
            }
        };
        if (req) {
            /* Just a note using Promise.all() would probably be faster */
            if (id) {
                console.log('Server Fetching Book', id);
                const res = await fetch(
                    /*
                    API can be found in next.config.js
                    Local: http://localhost:5001/ajonp-ajs-books/us-central1/api/
                    Remote: https://us-central1-ajonp-ajs-books.cloudfunctions.net/api/
                    */
                    `${process.env.API_ENDPOINT}book?id=${id}`
                );
                const json = await res.json();
                retObj.book = json;
            }
            if (chapterId) {
                console.log('Server Fetching Chapter', chapterId);
                const res = await fetch(
                    `${process.env.API_ENDPOINT}chapter?id=${id}&chapterId=${chapterId}`
                );
                const json = await res.json();
                retObj.chapter = json;
            }
            if (pageId) {
                console.log('Server Fetching Page', pageId);
                const res = await fetch(
                    `${
                        process.env.API_ENDPOINT
                    }page?id=${id}&chapterId=${chapterId}&pageId=${pageId}`
                );
                const json = await res.json();
                retObj.page = json;
            }
        }
        return retObj;
    }
    async componentDidMount() {
        /* Coming from SSR Initial Props */
        await this.setState({
            book: this.props.book,
            chapter: this.props.chapter,
            page: this.props.page,
            firebase: await loadFirebase()
        });

        /* After client loads */
        this.updateFirebaseRefs(
            this.props.book.id ,
            this.props.chapter.id ,
            this.props.page.id
        );
    }
    componentWillUnmount() {
        /* Stop observing */
        this.stopSubs();
    }
    stopSubs() {
        this.state.stopSubs.next(true);
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.router.query !== this.props.router.query) {
            const q = this.props.router.query;
            if (q) {
                this.updateFirebaseRefs(
                    q.id ,
                    q.chapterId ,
                    q.pageId
                );
            }
        }
    }
    updateFirebaseRefs(
        bookId,
        chapterId ,
        pageId
    ) {
        if (bookId) {
            const booksRef = this.state.firebase
                .firestore()
                .collection('books')
                .doc(bookId);
            // Book Detail
            docData(booksRef, 'id')
                .pipe(takeUntil(this.state.stopSubs))
                .subscribe(book => {
                    this.setState({ book });
                });
        }
        // Chapter Detail
        if (chapterId) {
            const chapterRef = this.state.firebase
                .firestore()
                .collection(`books/${bookId}/chapters`)
                .doc(chapterId);
            docData(chapterRef, 'id')
                .pipe(takeUntil(this.state.stopSubs))
                .subscribe(chapter => {
                    this.setState({ chapter });
                });

            if (pageId) {
                const pageRef = this.state.firebase
                    .firestore()
                    .collection(`books/${bookId}/chapters/${chapterId}/pages`)
                    .doc(pageId);
                docData(pageRef, 'id')
                    .pipe(takeUntil(this.state.stopSubs))
                    .subscribe(page => {
                        this.setState({ page });
                    });
            } else {
                /* Remove page state if not added */
                this.state.page = new PageModel();
            }
        } else {
            /* Remove chapter state if not added */
            this.state.chapter = new ChapterModel();
        }
    }
    render() {
        let chapter;
        if (this.state.chapter ) {
            chapter = (
                <ChapterDetail book={this.state.book} chapter={this.state.chapter} />
            );
        }
        let page;
        if (this.state.page.text) {
            page = (
                <Grid container direction="row" justify="center">
                    <BookPage page={this.state.page} />
                </Grid>
            );
        }
        return (
            <Grid container direction="row" justify="center">
                <BookDetail book={this.state.book} />
                {chapter}
                {page}
            </Grid>
        );
    }
}

const BookWithRouter = withRouter(book);

export default BookWithRouter;
