import moment from 'moment'; 
import localizationEs from 'moment/locale/es';

moment.locale('es', localizationEs);

const weekDay = ()=>{

	let today = moment();
	let i = 0;
	let lengthDay = 5;
	if(moment(today).day()==6)//dia sabado
	{
		today = moment(today).add(2,'days');
	}
	else if(moment(today).day()==0)//dia domingo
	{	
		today = moment(today).add(1,'days');
	}else{
		lengthDay = 6 - moment(today).day();
	}

	let dates = [];

	while(i<lengthDay){
		dates.push({
			date : moment(today).add(i, 'days').format('DD-MM-YYYY'),
			day : moment(today).add(i, 'days').format('dd')
		});
		i = i + 1;
	}
	return dates;

}

export {weekDay};