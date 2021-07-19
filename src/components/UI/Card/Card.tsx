import classes from './Card.module.css';

const Card = ({ children }: { children: React.ReactNode }) => <div className={classes.card}>{children}</div>;

export default Card;
