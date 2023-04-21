import { Helmet } from "react-helmet";

type Props = {
  title: string;
}

const PageHead = ({ title }: Props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" type="image/png" href="logo.png" sizes="16x16" />
    </Helmet>
  );
};

export { PageHead };
