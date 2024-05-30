
import classes from './TitlePage.module.css';
export default function TitlePage({title}){
    return(
        <div className={classes.header}>
                <h1>{title}</h1>
            </div>
    );
}