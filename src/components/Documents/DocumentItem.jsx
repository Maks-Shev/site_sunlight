import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports } from '../../features/API/reports/reportsSlice';
import icon from '/img/home/download_icon.svg';
import PropTypes from 'prop-types';

function DocumentItem({ title, type_report }) {
	const dispatch = useDispatch();
	const { reports, status } = useSelector((state) => state.reports);
  
	useEffect(() => {
	  if (status === 'idle') {
		dispatch(fetchReports());
	  }
	}, [dispatch, status]);
  
	const filteredReport = reports.find((report) => report.title === 'Уставные документы' && report.type_report === type_report);
  
	const downloadFile = async () => {
	  try {
		if (!filteredReport) {
		  throw new Error('Документ не найден');
		}
  
		const response = await fetch(filteredReport.url_doc);
  
		if (!response.ok) {
		  throw new Error('Ошибка при скачивании файла');
		}
  
		const blob = await response.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
  
		if (window.innerWidth < 767) {
		  link.href = downloadUrl;
		  link.download = filteredReport.url_doc.split('/').pop();
		  document.body.appendChild(link);
		  link.click();
		  link.remove();
		} else {
		  window.open(downloadUrl, '_blank');
		}
  
		window.URL.revokeObjectURL(downloadUrl);
	  } catch (error) {
		console.error('Error:', error);
	  }
	};
  
	return (
	  <div className='documentItem'>
		<div className='documentItem__title'>
		  <h2>{title}</h2>
		</div>
		<div className='documentItem__button' onClick={downloadFile}>
		  <p className='documentItem__buttonText'>Скачать </p>
		  <img className='documentItem__buttonImg' src={icon} alt='icon download' />
		</div>
	  </div>
	);
  }
  
  DocumentItem.propTypes = {
	title: PropTypes.string.isRequired,
	type_report: PropTypes.number.isRequired,
  };
  
  export default DocumentItem;