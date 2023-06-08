import { Fragment, useEffect, useState } from 'react';
import classes from './PasswordStrengthMeter.module.css';

type Meter = {
  label: string;
  validity: string;
  score: number;
  class: string;
};

const PasswordStrengthMeter = ({ score }: { score: number }) => {
  const [meter, setMeter] = useState<Meter>({
    label: 'Weak',
    validity: '(Invalid)',
    score: 1,
    class: classes.weak,
  });

  const createPasswordLabel = (score: number) => {
    switch (score) {
      case 1:
        setMeter({
          label: 'Fair',
          validity: '(Invalid)',
          score: 2,
          class: classes.fair,
        });
        break;
      case 2:
        setMeter({
          label: 'Good',
          validity: '(Invalid)',
          score: 3,
          class: classes.good,
        });
        break;
      case 3:
        setMeter({
          label: 'Strong',
          validity: '(Valid)',
          score: 4,
          class: classes.strong,
        });
        break;
      case 4:
        setMeter({
          label: 'Strongest',
          validity: '(Valid)',
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
            <strong className={meter.class}>{meter.label}</strong>{' '}
            <strong className={meter.class}>{meter.validity}</strong>
          </>
        }
      </label>
    </Fragment>
  );
};

export default PasswordStrengthMeter;
