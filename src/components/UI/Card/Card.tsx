import classes from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => <div className={classes.card}>{children}</div>;

export default Card;
