type Props = {
  children: JSX.Element[];
};

const Container = ({ children }: Props) => {
  return <div className="max-w-6xl mx-auto">{children}</div>;
};
export default Container;
