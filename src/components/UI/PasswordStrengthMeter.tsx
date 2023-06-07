import { Fragment, useEffect, useState } from 'react';
import classes from './PasswordStrengthMeter.module.css';

type Meter = {
  label: string;
  score: number;
  class: string;
};

const PasswordStrengthMeter = ({ score }: { score: number }) => {
  const [meter, setMeter] = useState<Meter>({
    label: 'Weak (Invalid)',
    score: 1,
    class: classes.weak,
  });

  const createPasswordLabel = (score: number) => {
    switch (score) {
      case 1:
        setMeter({ label: 'Fair (Invalid)', score: 2, class: classes.fair });
        break;
      case 2:
        setMeter({ label: 'Good (Invalid)', score: 3, class: classes.good });
        break;
      case 3:
        setMeter({
          label: 'Strong (Valid)',
          score: 4,
          class: classes.strong,
        });
        break;
      case 4:
        setMeter({
          label: 'Strongest (Valid)',
          score: 5,
          class: classes.strongest,
        });
        break;
    }
  };

  useEffect(() => {
    createPasswordLabel(score);
  }, [score]);
  return (
    <Fragment>
      <progress
        className={`${classes.meter__progress} ${meter.class}`}
        value={meter.score}
        max='5'
      />
      <br />
      <label className='meter__label'>
        {
          <>
            <strong>Password strength:</strong>{' '}
            <span className={meter.class}>{meter.label}</span>
          </>
        }
      </label>
    </Fragment>
  );
};

export default PasswordStrengthMeter;
