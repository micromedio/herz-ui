/** @jsxImportSource theme-ui */
export interface TypographyProps {
  color?: 'primary' | 'secondary' | 'text';
  size?: number;
}

const Typography = () => {
  return (
    <div>
      <h1 sx={{ variant: `text.heading1` }}>Heading 1 - 18/36</h1>
      <h2 sx={{ variant: `text.heading2` }}>Heading 2 - 15/24</h2>
      <h3 sx={{ variant: `text.heading3` }}>Heading 3 - 14/20</h3>
      <h4 sx={{ variant: `text.heading4` }}>Heading 4 - 13/20</h4>
      <p sx={{ variant: `text.body1` }}>Body 1 - 14/20</p>
      <p sx={{ variant: `text.body2` }}>Body 2 - 13/20</p>
      <p sx={{ variant: `text.body3` }}>Body 3 - 13/16</p>
      <p sx={{ variant: `text.caption` }}>Caption - 12/20</p>
      <p sx={{ variant: `text.button1` }}>Button - 14/20</p>
    </div>
  );
};

export default Typography;
