"use client"
import React, { useState } from 'react';

const QAForm = () => {
  const [formState, setFormState] = useState({
    emptyTarget: { check: false, instantQA: false, ignore: false },
    extraNumber: { check: false, instantQA: false, ignore: false },
    inconsistentTarget: { check: false, instantQA: false, ignore: false },
    leadingSpace: { check: false, instantQA: false, ignore: false },
    maxSegmentLengthPercent: { check: false, instantQA: false, ignore: false, value: 130 },
    maxTargetSegmentLengthInCharacters: { check: false, instantQA: false, ignore: false, value:1300 },
    missingNumber: { check: false, instantQA: false, ignore: false },
    missingSpaces: { check: false, instantQA: false, ignore: false },
    repeatedWords: { check: false, instantQA: false, ignore: false },
    spelling: { check: false, instantQA: false, ignore: false },
    identicalText: { check: false, instantQA: false, ignore: false },
  });

  const handleChange = (event) => {
    const { name, checked, type, value } = event.target;
    const [field, subfield] = name.split('.');
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [subfield]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data submitted:', formState);
  };

  return (
      <form onSubmit={handleSubmit}>
        <div style={styles.headerRow}>
          <div style={styles.mainColumn}></div>
          <div style={styles.checkboxColumn}>Instant QA</div>
          <div style={styles.checkboxColumn}>Ignore</div>
        </div>
        {Object.keys(formState).map((key) => (
          <div style={styles.row} key={key}>
            <div style={styles.mainColumn}>
              <label style={styles.checkboxLabel}>
                <input
                  style={{marginRight:'10px',}}  
                  type="checkbox"
                  name={`${key}.check`}
                  checked={formState[key].check}
                  onChange={handleChange}
                />{' '}
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              {['maxSegmentLengthPercent', 'maxTargetSegmentLengthInCharacters'].includes(key) && (
                <input
                  type="number"
                  name={`${key}.value`}
                  value={formState[key].value}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter value"
                />
              )}
            </div>
            <div style={styles.checkboxColumn}>
              <input
                type="checkbox"
                name={`${key}.instantQA`}
                checked={formState[key].instantQA}
                onChange={handleChange}
              />
            </div>
            <div style={styles.checkboxColumn}>
              <input
                type="checkbox"
                name={`${key}.ignore`}
                checked={formState[key].ignore}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}
      </form>
  );
};

const styles = {
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        fontWeight: 'bold',
      },  
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  mainColumn: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
  },
  checkboxColumn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
  },
  input: {
    marginLeft: '10px',
    width: '60px',
  }
};

export default QAForm;
