import React from 'react';

const QualityForm = ({ qualityForm, handleQualityChange }) => {
  return (
    <>
      <div className="flex items-center mb-2 font-bold">
        <div className="flex-3"></div>
        <div className="flex-1 flex justify-center">Instant QA</div>
        <div className="flex-1 flex justify-center">Ignore</div>
      </div>
      {Object.keys(qualityForm).map((key) => (
        <div className="flex items-center mb-2" key={key}>
          <div className="flex-3 flex items-center">
            <label className="flex items-center mr-2">
              <input
                className="mr-2"
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
                className="ml-2 w-16"
                placeholder="Enter value"
              />
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <input
              type="checkbox"
              name={`${key}.instantQA`}
              checked={qualityForm[key].instantQA}
              onChange={handleQualityChange}
            />
          </div>
          <div className="flex-1 flex justify-center">
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

export default QualityForm;
