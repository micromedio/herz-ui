/** @jsxImportSource theme-ui */
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';

export interface PlusLabelProps {
  labels: string[];
  tooltip: string;
  customTooltip?: React.ReactNode;
}

export default function PlusLabel({
  tooltip,
  labels,
  customTooltip,
}: PlusLabelProps) {
  const additionalDataNumber = ' +' + (labels?.length - 1);

  return (
    <div
      sx={{
        display: 'flex',
        '& label': { display: 'flex' },
        button: { marginLeft: '.5rem', padding: '0.1rem .3rem' },
      }}
    >
      {labels?.map(
        (string, index) => index === 0 && <label key={index}>string</label>
      )}
      <Tooltip title={tooltip} custom={customTooltip} placement="top">
        <Button variant="filled" color="text">
          <>{labels?.length > 1 && <>{additionalDataNumber}</>}</>
        </Button>
      </Tooltip>
    </div>
  );
}
