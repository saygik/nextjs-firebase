import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import MenuAppBar from '../src/components/MenuAppBar';
import theme from '../src/themes/theme';
import { AuthProvider } from '../src/context/AuthStore'

    class _App extends App {
        static async getInitialProps({Component,router, ctx}) {
            return {
                pageProps: Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}
            }
        }

        componentDidMount() {
            const jssStyles = document.querySelector('#jss-server-side')
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles)
            }

        }

        render() {
            const {
                Component,
                pageProps,
            } = this.props
            return (
                <>
                    <Head>
                        <title>NextJS - With Redux and Material UI</title>
                    </Head>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline/>
                        <AuthProvider>
                            <MenuAppBar/>
                            <Component {...pageProps} />
                        </AuthProvider>

                    </MuiThemeProvider>
                </>
            )
        }
    }

export default _App
