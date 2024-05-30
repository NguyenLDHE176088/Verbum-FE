export default function SAForm() {
    return (
        <form>
            <div style={styles.section}>
                <p>Mark project as <strong>‘assigned’</strong> once all jobs are:</p>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" /> emailed
                </label>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" /> accepted
                </label>
            </div>
            <div style={styles.section}>
                <p>Mark project as <strong>‘completed’</strong> once all jobs are:</p>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" /> completed
                </label>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" /> delivered
                </label>
            </div>
            <div style={styles.section}>
                <p>Mark project as <strong>‘canceled’</strong> once all jobs are:</p>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" /> canceled
                </label>
            </div>
        </form>
    );
};

const styles = {
    section: {
      marginBottom: '20px',
    },
    checkboxLabel: {
      display: 'block',
      marginBottom: '10px',
    }
  };