import {  makeStyles } from '@material-ui/core/styles';

const SecurityTab =(props)=>{
    const  classes  = useStyles();

    return (
        <>
            Sec Tab
        </>
    )

}


const useStyles = makeStyles(theme => ({
    dialogContent: {
        paddingTop: theme.spacing(2)
    },

    badge: {
        top: theme.spacing(2),
        right: -theme.spacing(2)
    },


}));


export default SecurityTab;
