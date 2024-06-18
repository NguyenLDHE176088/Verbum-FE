
function StatusForm({ statusForm, handleStatusChange }) {

    return (
        <div>
            <div className="mb-[20px]">
                <p>Mark project as <strong>‘assigned’</strong> once all jobs are:</p>
                <label className="block mb-[10px]">
                    <input type="checkbox" name="emailed" checked={statusForm.emailed} onChange={handleStatusChange} /> emailed
                </label>
                <label className="block mb-[10px]">
                    <input type="checkbox" name="accepted" checked={statusForm.accepted} onChange={handleStatusChange} /> accepted
                </label>
            </div>
            <div className="mb-[20px]">
                <p>Mark project as <strong>‘completed’</strong> once all jobs are:</p>
                <label className="block mb-[10px]">
                    <input type="checkbox" name="completed" checked={statusForm.completed} onChange={handleStatusChange} /> completed
                </label>
                <label className="block mb-[10px]">
                    <input type="checkbox" name="delivered" checked={statusForm.delivered} onChange={handleStatusChange} /> delivered
                </label>
            </div>
            <div className="mb-[20px]">
                <p>Mark project as <strong>‘canceled’</strong> once all jobs are:</p>
                <label className="block mb-[10px]">
                    <input type="checkbox" name="canceled" checked={statusForm.canceled} onChange={handleStatusChange} /> canceled
                </label>
            </div>
        </div>
    );
}

export default StatusForm;
