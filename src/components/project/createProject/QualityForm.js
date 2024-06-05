
const QualityForm = ({qualityForm,handleQualityChange}) => {
  return (
      <>
        <div style={styles.headerRow}>
          <div style={styles.mainColumn}></div>
          <div style={styles.checkboxColumn}>Instant QA</div>
          <div style={styles.checkboxColumn}>Ignore</div>
        </div>
        {Object.keys(qualityForm).map((key) => (
          <div style={styles.row} key={key}>
            <div style={styles.mainColumn}>
              <label style={styles.checkboxLabel}>
                <input
                  style={{marginRight:'10px',}}  
                  type="checkbox"
                  name={`${key}.check`}
                  checked={qualityForm[key].check}
                  onChange={handleQualityChange}
                />{' '}
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              {['maxSegmentLengthPercent', 'maxTargetSegmentLengthInCharacters'].includes(key) && (
                <input
                  type="number"
                  name={`${key}.value`}
                  value={qualityForm[key].value}
                  onChange={handleQualityChange}
                  style={styles.input}
                  placeholder="Enter value"
                />
              )}
            </div>
            <div style={styles.checkboxColumn}>
              <input
                type="checkbox"
                name={`${key}.instantQA`}
                checked={qualityForm[key].instantQA}
                onChange={handleQualityChange}
              />
            </div>
            <div style={styles.checkboxColumn}>
              <input
                type="checkbox"
                name={`${key}.ignore`}
                checked={qualityForm[key].ignore}
                onChange={handleQualityChange}
              />
            </div>
          </div>
        ))}
      </>
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

export default QualityForm;
