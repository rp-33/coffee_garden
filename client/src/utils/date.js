import moment from 'moment'; 
import localizationEs from 'moment/locale/es';

moment.locale('es', localizationEs);

const weekDay = ()=>{

	let today = moment();
	let i = 0;
	let lengthDay = 5;
	if(moment(today).day()===6)//dia sabado
	{
		today = moment(today).add(2,'days');
	}
	else if(moment(today).day()===0)//dia domingo
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

const formatDate = (date)=>{
	date = date.split('T')[0];
	date = date.split('-');
	return date[1] + '-' + date[2] + '-' + date[0];
	//retorna MM-DD-YYYY
}

const todayDate = ()=>{
	return{
		init :  moment().format('YYYY-MM-DD') ,
		end :  moment().add(1, 'days').format('YYYY-MM-DD')
	}
}

const structureDate = (date)=>{
	date = date.split('-');
	date[1] = date[1] - 1;
	date = new Date(date[2],date[1],date[0]);
	return moment(date).format('YYYY-MM-DD');
}

export {
	weekDay,
	formatDate,
	todayDate,
	structureDate
};