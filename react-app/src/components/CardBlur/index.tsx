import { CardContainer } from "./styles";
interface ICardBlurProps {
  children: React.ReactNode;
}

export const CardBlur: React.FC<ICardBlurProps> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};
