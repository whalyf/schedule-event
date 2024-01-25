import { CardContainer } from './styles';
interface ICardBlurProps {
  children: React.ReactNode;
  theme?: 'past' | 'happening' | 'upcoming' | 'default';
}

export const CardBlur: React.FC<ICardBlurProps> = ({
  children,
  theme = 'default',
}) => {
  return <CardContainer theme={theme}>{children}</CardContainer>;
};
