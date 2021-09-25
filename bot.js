// СДЕЛАНО WhoGamer
// vk.com/id388527561
// версия: 0.0.1
// группа моего бота vk.com/public202114977
// язык JavaScript

const questions = require('questions');
const { VK } = require('vk-io');
const vk = new VK();

let user = ``;
let access = 0;
let autostatus = 0;
let autoonline = 0;
let autooffline = 0;

function tama() {
 	let date = new Date();
 	let days = date.getDate();
 	let hours = date.getHours();
 	let minutes = date.getMinutes();
 	if (hours < 10) hours = "0" + hours;
 	if (minutes < 10) minutes = "0" + minutes++;
 	var times = hours + ':' + minutes;
 	return times;
}

function data() {
 	var date = new Date();
 	let days = date.getDate();
 	let month = date.getMonth() + 1; 
 	if (month < 10) month = "0" + month;
 	if (days < 10) days = "0" + days;
 	var datas = days + ':' + month + ':2021';
 	return datas;
};

setInterval(() => {
	if(autostatus == 1) vk.api.status.set({ text: `${data()}, ${tama()}` })
	.catch((error) => {
		console.log(`Исчерпан лимит изменений статуса, ВК не дает сменить его`);
	});
}, 60000);

setInterval(() => {
	if(autoonline == 1) vk.api.account.setOnline({ })
}, 300000);

setInterval(() => {
	if(autooffline == 1) vk.api.account.setOffline({ })
}, 1000);

questions.askOne({ info:'Получите токен на https://vkhost.github.io/ выбирая приложение Kate Mobile\nВведите токен' }, function(result){
	vk.setOptions({
		token: result
	})
    vk.updates.start().catch(console.error)
		questions.askOne({ info:`Что Вы хотите сделать?\n[1] Информация о профиле/страницы\n[2] Информация об аккаунте\n[3] Авто-статус, время на данный момент\n[4] Авто-онлайн\n[5] Выход\n\nВведите цифру или введите: 3,4` }, function(result){
			if(result == '1'||result == 1){
				vk.api.account.getProfileInfo({ }).then((info) => {
					let sextext = `не указан`;
					if(info.sex == 1) sextext = `женский`;
					if(info.sex == 2) sextext = `мужской`;
					let gorod = `не указан`;
					if(info.city.title != undefined||info.city.title != 'DELETED'||info.city.title != null||info.city.title != '') gorod = `${info.city.title}`;
					let data = `не указана`;
					if(info.bdate != undefined||info.bdate != null||info.bdate != 'DELETED'||info.bdate != '') data = `${info.bdate}`;
					console.log(`\nИнформация о профиле:\n\nИмя: ${info.first_name} ${info.last_name} ${info.screen_name}\nПол: ${sextext}\nСтатус: ${info.status}\nГород: ${gorod}\nДата рождения: ${data}\n`);
					process.exit(-1);
				});
			};
			if(result == '2'||result == 2){
				vk.api.account.getInfo({ }).then((info) => {
					let site = `нет`;
					if(info.https_required == 1) site = `да`;
					console.log(`\nИнформация об аккаунте:\n\nСтрана определенная по IP-адресу: ${info.country}\nВключено ли безопасное соединение для аккаунта: ${site}`);
					process.exit(-1);
				});
			};;
			if(result == '3'||result == 3){
				vk.api.status.set({ text: `${data()}, ${tama()}` });
				autostatus = 1;
				console.log(`Авто-статус включён, но чтобы он работал Вы должны держать этот скрипт включенным!`);
			};
			if(result == '4'||result == 4){
				vk.api.account.setOnline({ })
				autoonline = 1;
				console.log(`Авто-онлайн включён, но чтобы он работал Вы должны держать этот скрипт включенным!`);
			}
			if(result == '5'||result == 5){
				console.log(`\nСкрипт закрывается..`);
				process.exit(-1);
			};
			if(result == '3,4'||result == '3.4'||result == '3 . 4'||result == '3. 4'||result == 34||result == 3.4||result == '3, 4'||result == '3 , 4'){
				vk.api.status.set({ text: `${data()}, ${tama()}` });
				autostatus = 1;
				console.log(`Авто-статус включён, но чтобы он работал Вы должны держать этот скрипт включенным!`);
				vk.api.account.setOnline({ })
				autoonline = 1;
				console.log(`Авто-онлайн включён, но чтобы он работал Вы должны держать этот скрипт включенным!`);
			};
		});
});