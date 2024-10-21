import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperts, fetchExpertById } from '../../features/API/experts/expertsSlice';

const SpecialistsComponent = () => {
  const dispatch = useDispatch();
  const experts = useSelector((state) => state.experts.experts);
  const currentExpert = useSelector((state) => state.experts.currentExpert);
  const status = useSelector((state) => state.experts.status);
  const error = useSelector((state) => state.experts.error);
  const [selectedExpertId, setSelectedExpertId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExperts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (selectedExpertId) {
      dispatch(fetchExpertById(selectedExpertId));
    }
  }, [selectedExpertId, dispatch]);

  return (
    <div className='container1200'>
      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'succeeded' && (
        <div>
          <h2>Список специалистов</h2>
          <div>
            {experts.map((expert, index) => (
              <div key={index}>
                <h3>{expert.surname} {expert.name} {expert.patronymic}</h3>
                <p>{expert.job_title}</p>
                <button onClick={() => setSelectedExpertId(index + 1)}>О специалисте</button>
              </div>
            ))}
          </div>

          {currentExpert && (
            <div>
              <h2>Выбранный специалист</h2>
              <h3>{currentExpert.surname} {currentExpert.name} {currentExpert.patronymic}</h3>
              <p>{currentExpert.job_title}</p>
              <img src={currentExpert.image} alt={`${currentExpert.surname} ${currentExpert.name} ${currentExpert.patronymic}`} />
              <p>{currentExpert.responsibilities}</p>
              <p>{currentExpert.description}</p>
            </div>
          )}
        </div>
      )}
      {status === 'failed' && <p>{error}</p>}
    </div>
  );
};

export default SpecialistsComponent;